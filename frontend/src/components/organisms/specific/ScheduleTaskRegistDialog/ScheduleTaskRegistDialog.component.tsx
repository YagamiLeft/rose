// Reacts
import React from 'react';
// Libs
import { DateRange, Range } from 'react-date-range';
// UIs
import {
  Dialog,
  DialogTitle,
  DialogContent,
  InputLabel,
  TextField,
  InputAdornment,
  DialogActions,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
// Interfaces
import { Task } from 'gantt-task-react';

export interface ScheduleTaskRegistDialogProps {
  isOpenScheduleTaskRegistDialog: boolean;
  projectList: Task[];
  taskList: Task[];
  taskRange: Range[];
  relatedProject: string;
  mandatoryCompletionTask: string;
  onClickTaskRegistButton: () => void;
  onClickCloseButton: () => void;
  onChangeRelatedProject: (event: SelectChangeEvent) => void;
  onChangeMandatoryCompletionTask: (event: SelectChangeEvent) => void;
  onChangeTaskName: (nbame: string) => void;
  onChangeTaskDateRange: (range: Range) => void;
}

export const ScheduleTaskRegistDialog: React.FC<ScheduleTaskRegistDialogProps> = ({
  isOpenScheduleTaskRegistDialog,
  projectList,
  taskList,
  taskRange,
  relatedProject,
  mandatoryCompletionTask,
  onClickTaskRegistButton,
  onClickCloseButton,
  onChangeRelatedProject,
  onChangeMandatoryCompletionTask,
  onChangeTaskName,
  onChangeTaskDateRange,
}) => {
  return (
    <Dialog className="task-regist-dialog-component" fullWidth maxWidth="sm" open={isOpenScheduleTaskRegistDialog}>
      <DialogTitle>Regist New Task</DialogTitle>

      <DialogContent className="regist-dialog-condtent">
        <FormControl variant="standard" fullWidth sx={{ paddingTop: 0 }}>
          <InputLabel>Related Project</InputLabel>
          <Select value={relatedProject} label="Related Project" onChange={onChangeRelatedProject}>
            {projectList.map((project, index) => {
              return (
                <MenuItem value={project.name} key={`project-${index}`}>
                  {project.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </DialogContent>

      {taskList.length !== 0 && (
        <DialogContent className="regist-dialog-condtent">
          <FormControl variant="standard" fullWidth sx={{ paddingTop: 0 }}>
            <InputLabel>Mandatory Completion Task</InputLabel>
            <Select
              value={mandatoryCompletionTask}
              label="Mandatory Completion Task"
              onChange={onChangeMandatoryCompletionTask}
            >
              {taskList.map((task, index) => {
                return (
                  <MenuItem value={task.name} key={`task-${index}`}>
                    {task.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
      )}

      <DialogContent className="regist-dialog-condtent">
        <InputLabel>Task Name</InputLabel>
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TaskIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
          onChange={(e) => onChangeTaskName(e.target.value)}
        />
      </DialogContent>

      <DialogContent className="regist-dialog-condtent">
        <InputLabel>Task Schedule</InputLabel>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => onChangeTaskDateRange(item.selection)}
          moveRangeOnFirstSelection={false}
          ranges={taskRange}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClickTaskRegistButton}>
          Regist
        </Button>
        <Button autoFocus onClick={onClickCloseButton}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
