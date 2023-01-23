// Reacts
import React from 'react';
// UIs
import { Container, Box, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// Components
import { HeaderComponent } from '../../organisms/common/Header/Header.component';
import { TaskAreaComponent, TaskAreaComponentProps } from '../../organisms/specific/TaskArea/TaskArea.component';
import {
  MemoTaskRegistDialogComponent,
  MemoTaskRegistDialogComponentProps,
} from '../../organisms/specific/MemoTaskRegistDialog/MemoTaskRegistDialog.component';
// Styles
import './TaskBoard.template.scss';

export interface TaskBoardTemplateProps {
  todoTaskAreaComponentProps: TaskAreaComponentProps;
  doingTaskAreaComponentProps: TaskAreaComponentProps;
  doneTaskAreaComponentProps: TaskAreaComponentProps;
  memoTaskRegistDialogComponentProps: MemoTaskRegistDialogComponentProps;
}

export const TaskBoardTemplate: React.FC<TaskBoardTemplateProps> = ({
  todoTaskAreaComponentProps,
  doingTaskAreaComponentProps,
  doneTaskAreaComponentProps,
  memoTaskRegistDialogComponentProps,
}) => {
  return (
    <>
      <HeaderComponent />
      <MemoTaskRegistDialogComponent {...memoTaskRegistDialogComponentProps} />
      <Container component="main" maxWidth={false} className="task-board-template">
        <Box className="title-area">
          <HelpOutlineIcon className="help-icon" />
          <Typography variant="h6">Daily Task Management</Typography>
        </Box>

        <Box className="tasks-area">
          <Box className="task-area">
            <TaskAreaComponent {...todoTaskAreaComponentProps} />
          </Box>
          <Box className="task-area">
            <TaskAreaComponent {...doingTaskAreaComponentProps} />
          </Box>
          <Box className="task-area">
            <TaskAreaComponent {...doneTaskAreaComponentProps} />
          </Box>
        </Box>
      </Container>
    </>
  );
};
