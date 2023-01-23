// Reacts
import React from 'react';
// UIs
import { AppBar, Box, Button, Card, IconButton, Toolbar, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForwardIcon from '@mui/icons-material/Forward';
// Styles
import './TaskArea.component.scss';

export interface TaskAreaComponentProps {
  title: string;
  taskItems: {
    taskTitle: string;
    taskDetail: string;
  }[];
  onClickAddTaskButton?: () => void;
  onClickForwardButton: (taskIndex: number, next: string) => void;
}

export const TaskAreaComponent: React.FC<TaskAreaComponentProps> = ({
  title,
  taskItems,
  onClickAddTaskButton,
  onClickForwardButton,
}) => {
  return (
    <Card elevation={10} className="task-area-component">
      <AppBar className="task-area-bar" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" className="task-area-title">
            {title}
          </Typography>
          {title === 'TODO' && (
            <IconButton size="large" edge="start" color="inherit" onClick={onClickAddTaskButton}>
              <AddCircleIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Box className="task-list-area">
        {taskItems.map((item, index) => {
          return (
            <Card elevation={5} className="task-item" key={index}>
              <AccountCircleIcon fontSize="large" />
              <Typography className="task-title" component="div">
                {item.taskTitle}
              </Typography>
              <Typography className="task-detail" component="div">
                {item.taskDetail}
              </Typography>

              <Box className="task-button-area">
                {title === 'TODO' && (
                  <IconButton className="task-button" onClick={() => onClickForwardButton(index, 'DOING')}>
                    <ForwardIcon />
                  </IconButton>
                )}

                {title === 'DOING' && (
                  <IconButton className="task-button" onClick={() => onClickForwardButton(index, 'DONE')}>
                    <ForwardIcon />
                  </IconButton>
                )}
              </Box>
            </Card>
          );
        })}
      </Box>
    </Card>
  );
};
