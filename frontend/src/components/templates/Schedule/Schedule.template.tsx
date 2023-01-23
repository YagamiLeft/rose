// Reacts
import React from 'react';
// UIs
import { Box, Button, Card, Container, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// Libs
import { Gantt, Task, ViewMode } from 'gantt-task-react';
// Components
import { HeaderComponent } from '../../organisms/common/Header/Header.component';
import {
  ScheduleProjectRegistDialog,
  ScheduleProjectRegistDialogProps,
} from '../../organisms/specific/ScheduleProjectRegistDialog/ScheduleProjectRegistDialog.component';
import {
  ScheduleTaskRegistDialog,
  ScheduleTaskRegistDialogProps,
} from '../../organisms/specific/ScheduleTaskRegistDialog/ScheduleTaskRegistDialog.component';
// Styles
import 'gantt-task-react/dist/index.css';
import './Schedule.template.scss';

export interface ScheduleTemplateProps {
  scheduleProjectRegistDialogProps: ScheduleProjectRegistDialogProps;
  scheduleTaskRegistDialogProps: ScheduleTaskRegistDialogProps;
  tasks: Task[];
  view: ViewMode;
  onClickNewProjectButton: () => void;
  onClickNewTaskButton: () => void;
  onClickExpander: (selTask: Task) => void;
  onChangeTask: (selTask: Task) => void;
  onChangeProgress: (selTask: Task) => Promise<void>;
  onDeleteTask: (selTask: Task) => boolean;
}

export const ScheduleTemplate: React.FC<ScheduleTemplateProps> = ({
  scheduleProjectRegistDialogProps,
  scheduleTaskRegistDialogProps,
  tasks,
  view,
  onClickNewProjectButton,
  onClickNewTaskButton,
  onClickExpander,
  onChangeTask,
  onChangeProgress,
  onDeleteTask,
}) => {
  return (
    <>
      <HeaderComponent />
      <ScheduleProjectRegistDialog {...scheduleProjectRegistDialogProps} />
      <ScheduleTaskRegistDialog {...scheduleTaskRegistDialogProps} />
      <Container component="main" maxWidth={false} className="schedule-template">
        <Box className="title-area">
          <HelpOutlineIcon className="help-icon" />
          <Typography variant="h6">Create Schedule</Typography>

          <Box className="button-area">
            <Button className="project-button" onClick={onClickNewProjectButton}>
              New Project
            </Button>
            <Button className="task-button" onClick={onClickNewTaskButton}>
              New Task
            </Button>
          </Box>
        </Box>

        {tasks.length !== 0 && (
          <Card elevation={10}>
            <Gantt
              tasks={tasks}
              viewMode={view}
              onDateChange={onChangeTask}
              onDelete={onDeleteTask}
              onProgressChange={onChangeProgress}
              onExpanderClick={onClickExpander}
              columnWidth={100}
            />
          </Card>
        )}
      </Container>
    </>
  );
};