// Reacts
import React from 'react';
// Uis
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from 'gantt-task-react';
// Styles
import './ScheduleTaskDeleteDialog.component.scss';

export interface ScheduleTaskDeleteDailogComponent {
  isOpenScheduleTaskDeleteDialog: boolean;
  tasks: Task[];
  onClickCloseButton: () => void;
  onClickDeleteTask: (taskIndex: number) => void;
}

export const ScheduleTaskDeleteDialogComponent: React.FC<ScheduleTaskDeleteDailogComponent> = ({
  isOpenScheduleTaskDeleteDialog,
  tasks,
  onClickCloseButton,
  onClickDeleteTask,
}) => {
  return (
    <Dialog className="task-delete-dialog-component" fullWidth maxWidth="sm" open={isOpenScheduleTaskDeleteDialog}>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent className="regist-dialog-condtent">
        <List>
          {tasks.map((task, index) => {
            if (task.type === 'task') {
              return (
                <ListItem key={index}>
                  <DeleteIcon className="delete-icon" onClick={() => onClickDeleteTask(index)} />
                  <ListItemText primary={`${task.name}`} />
                </ListItem>
              );
            }
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClickCloseButton}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
