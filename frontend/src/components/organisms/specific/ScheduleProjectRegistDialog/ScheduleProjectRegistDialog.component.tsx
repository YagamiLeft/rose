// Reacts
import React from 'react';
// UIs
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
// Libs
import { DateRange, Range } from 'react-date-range';
// Styles
import './ScheduleProjectRegistDialog.component.scss';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export interface ScheduleProjectRegistDialogProps {
  isOpenScheduleProjectRegistDialog: boolean;
  projectRange: Range[];
  onClickProjectRegistButton: () => void;
  onClickCloseButton: () => void;
  onChangeProjectName: (name: string) => void;
  onChangeProjectDateRange: (range: Range) => void;
}

export const ScheduleProjectRegistDialog: React.FC<ScheduleProjectRegistDialogProps> = ({
  isOpenScheduleProjectRegistDialog,
  projectRange,
  onClickProjectRegistButton,
  onClickCloseButton,
  onChangeProjectName,
  onChangeProjectDateRange,
}) => {
  return (
    <Dialog className="task-regist-dialog-component" fullWidth maxWidth="sm" open={isOpenScheduleProjectRegistDialog}>
      <DialogTitle>Regist New Project</DialogTitle>
      <DialogContent className="regist-dialog-condtent">
        <InputLabel>Project Name</InputLabel>
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <WorkspacesIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
          onChange={(e) => onChangeProjectName(e.target.value)}
        />
      </DialogContent>
      <DialogContent className="regist-dialog-condtent">
        <InputLabel>Project Schedule</InputLabel>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => onChangeProjectDateRange(item.selection)}
          moveRangeOnFirstSelection={false}
          ranges={projectRange}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClickProjectRegistButton}>
          Regist
        </Button>
        <Button autoFocus onClick={onClickCloseButton}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
