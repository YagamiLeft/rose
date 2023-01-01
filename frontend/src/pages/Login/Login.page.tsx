import React, { useState } from 'react';

import { Backdrop, Box, CircularProgress, Input } from '@mui/material';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import ReactECharts from 'echarts-for-react';

import * as XLSX from 'xlsx';

export const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState<string[][]>([]);
  const [chartOption, setChartOption] = useState<any>({});

  const onChnageFileInput = (event: any) => {
    setIsLoading(true);
    const files = event.currentTarget.files;
    if (!files || files?.length === 0) return;

    const file = files[0];

    file
      .arrayBuffer()
      .then((fileBuffer: ArrayBuffer) => {
        readFileWithXlsxJS(fileBuffer)
          .catch((e) => console.log(e))
          .finally(() => setIsLoading(false));
      })
      .catch((e: any) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const readFileWithXlsxJS = async (fileBuffer: ArrayBuffer) => {
    const workbook = XLSX.read(fileBuffer, { type: 'buffer', bookVBA: true });
    const mesuaredSheetName = workbook.SheetNames[0];
    const specLowSheetName = workbook.SheetNames[1];
    const specHighSheetName = workbook.SheetNames[2];

    const mesuaredSheet = workbook.Sheets[mesuaredSheetName];
    const specLowSheet = workbook.Sheets[specLowSheetName];
    const specHighSheet = workbook.Sheets[specHighSheetName];

    const measuredData: any = XLSX.utils.sheet_to_json(mesuaredSheet);
    const specLowData: any = XLSX.utils.sheet_to_json(specLowSheet);
    const specHighData: any = XLSX.utils.sheet_to_json(specHighSheet);

    const lowOFQS = Number(specLowData[0]['OFQS']);
    const lowQSOne = Number(specLowData[0]['QS1']);
    const lowVLN = Number(specLowData[0]['VLN']);
    const lowHLN = Number(specLowData[0]['HLN']);

    const highVLN = Number(specHighData[0]['VLN']);
    const highHLN = Number(specHighData[0]['HLN']);

    const tableData = measuredData.map((rowData: any) => {
      const chipNo = rowData['チップ番号'];
      const wfNo = rowData['wfNo'];
      let ofqs = rowData['OFQS'];
      let qs_one = rowData['QS1'];
      let qs_two = rowData['QS2'];

      let vln = rowData['VLN'];
      let hln = rowData['HLN'];

      if (Number(ofqs) < lowOFQS) {
        qs_one = 'broken';
        qs_two = 'broken';
      } else if (Number(qs_one) < lowQSOne) {
        qs_two = 'broken';
      }

      if (!(lowVLN > vln || vln < highVLN)) vln = 'broken';

      if (!(lowHLN > hln || hln < highHLN)) hln = 'broken';

      return [chipNo, wfNo, ofqs, qs_one, qs_two, vln, hln];
    });
    setTableData(tableData);

    const chartData = tableData.map((rowData: any) => {
      let ofqs = rowData[2];
      let qs_one = rowData[3];
      let qs_two = rowData[4];

      let vln = rowData[5];
      let hln = rowData[6];

      return { type: 'scatter', data: [ofqs, qs_one, qs_two, vln, hln] };
    });

    const option = {
      xAxis: {
        data: ['OFQS', 'QS1', 'QS2', 'VLN', 'HLN'],
      },
      yAxis: {},
      dataZoom: [
        {
          type: 'slider',
          show: true,
          yAxisIndex: 0,
        },
        {
          type: 'slider',
          show: true,
          xAxisIndex: 0,
        },
      ],
      series: chartData,
    };
    setChartOption(option);
  };

  const columns = [
    {
      name: 'チップ番号',
      label: 'チップ番号',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'wfNo',
      label: 'wfNo',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'OFQS',
      label: 'OFQS',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'QS1',
      label: 'QS1',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'QS2',
      label: 'QS2',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'VLN',
      label: 'VLN',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'HLN',
      label: 'HLN',
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const options: MUIDataTableOptions = {
    print: false,
    downloadOptions: { filename: 'hogehoge.csv' },
    filterType: 'multiselect',
    selectableRows: 'none',
  };

  return (
    <Box component="main">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Input type="file" onChange={(event) => onChnageFileInput(event)} />

      <Box sx={{ pt: 5 }}>
        <MUIDataTable title={'POC'} data={tableData} columns={columns} options={options} />
      </Box>

      <ReactECharts option={chartOption} />
    </Box>
  );
};
