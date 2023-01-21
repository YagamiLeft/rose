// Reacts
import React from 'react';
// UIs
import { Container, Box } from '@mui/material';
// Components
import { HeaderComponent } from '../../organisms/common/Header/Header.component';
import { TaskAreaComponent, TaskAreaComponentProps } from '../../organisms/specific/TaskArea/TaskArea.component';
import {
  TaskRegistDialogComponent,
  TaskRegistDialogComponentProps,
} from '../../organisms/specific/TaskRegistModal/TaskRegistDialog.component';
// Styles
import './TaskBoard.template.scss';

export interface TaskBoardTemplateProps {
  todoTaskAreaComponentProps: TaskAreaComponentProps;
  doingTaskAreaComponentProps: TaskAreaComponentProps;
  doneTaskAreaComponentProps: TaskAreaComponentProps;
  taskRegistDialogComponentProps: TaskRegistDialogComponentProps;
}

export const TaskBoardTemplate: React.FC<TaskBoardTemplateProps> = ({
  todoTaskAreaComponentProps,
  doingTaskAreaComponentProps,
  doneTaskAreaComponentProps,
  taskRegistDialogComponentProps,
}) => {
  return (
    <>
      <HeaderComponent />
      <TaskRegistDialogComponent {...taskRegistDialogComponentProps} />
      <Container component="main" maxWidth={false} className="task-board-template">
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
