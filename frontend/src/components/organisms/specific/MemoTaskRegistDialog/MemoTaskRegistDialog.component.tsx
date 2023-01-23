// Reacts
import React from 'react';
// UIs
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from '@mui/material';
import { Subtitles, Info } from '@material-ui/icons';
// Styles
import './MemoTaskRegistDialog.component.scss';

export interface MemoTaskRegistDialogComponentProps {
  isOpenDialog: boolean;
  onCkickRegistTask: () => void;
  onClickCloseDialog: () => void;
  onChangeTaskTitle: (title: string) => void;
  onChangeTaskDetail: (detail: string) => void;
}

export const MemoTaskRegistDialogComponent: React.FC<MemoTaskRegistDialogComponentProps> = ({
  isOpenDialog,
  onCkickRegistTask,
  onClickCloseDialog,
  onChangeTaskTitle,
  onChangeTaskDetail,
}) => {
  const taskTitleInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <Subtitles />
      </InputAdornment>
    ),
  };

  const taskDetailInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <Info />
      </InputAdornment>
    ),
  };
  return (
    <Dialog className="task-regist-dialog-component" fullWidth maxWidth="sm" open={isOpenDialog}>
      <DialogTitle>Regist New Task</DialogTitle>
      <DialogContent>
        <TextField
          className="task-title-input"
          label="Task Title"
          fullWidth
          InputProps={taskTitleInputProps}
          variant="standard"
          onChange={(e) => onChangeTaskTitle(e.target.value)}
        />
        <TextField
          label="Task Detail"
          fullWidth
          multiline
          InputProps={taskDetailInputProps}
          variant="standard"
          onChange={(e) => onChangeTaskDetail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCkickRegistTask}>
          Regist
        </Button>
        <Button autoFocus onClick={onClickCloseDialog}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
