// Reacts
import React, { useState } from 'react';
// Template
import { ScheduleTemplate, ScheduleTemplateProps } from '../../components/templates/Schedule/Schedule.template';
// Interfaces
import { Task, ViewMode } from 'gantt-task-react';
import { ScheduleProjectRegistDialogProps } from '../../components/organisms/specific/ScheduleProjectRegistDialog/ScheduleProjectRegistDialog.component';
import { Range } from 'react-date-range';
import { ScheduleTaskRegistDialogProps } from '../../components/organisms/specific/ScheduleTaskRegistDialog/ScheduleTaskRegistDialog.component';
import { SelectChangeEvent } from '@mui/material';

export const SchedulePage: React.FC = () => {
  // const initTasks = () => {
  //   const currentDate = new Date();
  //   const tasks: Task[] = [
  //     {
  //       start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
  //       end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
  //       name: 'Some Project',
  //       id: 'ProjectSample',
  //       progress: 25,
  //       type: 'project',
  //       hideChildren: false,
  //     },
  //     {
  //       start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
  //       end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2, 12, 28),
  //       name: 'Idea',
  //       id: 'Task 0',
  //       progress: 45,
  //       type: 'task',
  //       project: 'ProjectSample',
  //     },
  //     {
  //       start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
  //       end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
  //       name: 'Research',
  //       id: 'Task 1',
  //       progress: 25,
  //       dependencies: ['Task 0'],
  //       type: 'task',
  //       project: 'ProjectSample',
  //     },
  //     {
  //       start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
  //       end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
  //       name: 'Discussion with team',
  //       id: 'Task 2',
  //       progress: 10,
  //       dependencies: ['Task 1'],
  //       type: 'task',
  //       project: 'ProjectSample',
  //     },
  //     {
  //       start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
  //       end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
  //       name: 'Developing',
  //       id: 'Task 3',
  //       progress: 2,
  //       dependencies: ['Task 2'],
  //       type: 'task',
  //       project: 'ProjectSample',
  //     },
  //     {
  //       start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
  //       end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
  //       name: 'Review',
  //       id: 'Task 4',
  //       type: 'task',
  //       progress: 70,
  //       dependencies: ['Task 2'],
  //       project: 'ProjectSample',
  //     },
  //     {
  //       start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
  //       end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
  //       name: 'Release',
  //       id: 'Task 6',
  //       progress: currentDate.getMonth(),
  //       type: 'milestone',
  //       dependencies: ['Task 4'],
  //       project: 'ProjectSample',
  //     },
  //     {
  //       start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
  //       end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
  //       name: 'Release',
  //       id: 'Task 7',
  //       progress: currentDate.getMonth(),
  //       type: 'milestone',
  //       dependencies: ['Task 4'],
  //       project: 'ProjectSample',
  //     },
  //   ];
  //   return tasks;
  // };

  const [view] = useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [projectName, setProjectname] = useState('');
  const [taskName, setTaskName] = useState('');

  // ScheduleProjectRegistDialog States
  const [isOpenScheduleProjectRegistDialog, setIsOpenScheduleProjectRegistDialog] = useState(false);
  const [projectRange, setProjectRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  // ScheduletaskRegistDialog States
  const [isOpenScheduleTaskRegistDialog, setIsOpenScheduleTaskRegistDialog] = useState(false);
  const [projectList, setProjectList] = useState<Task[]>([]);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskRange, setTaskRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [relatedProject, setRelatedProject] = useState('');
  const [mandatoryCompletionTask, setMandatoryCompletionTask] = useState('');

  const getStartEndDateForProject = (tasks: Task[], projectId: string) => {
    const projectTasks = tasks.filter((task) => task.project === projectId);
    let start = projectTasks[0].start;
    let end = projectTasks[0].end;

    projectTasks.forEach((_, index) => {
      const task = projectTasks[index];
      if (start.getTime() > task.start.getTime()) start = task.start;
      if (end.getTime() < task.end.getTime()) end = task.end;
    });

    return [start, end];
  };

  const onChangeTask = (selTask: Task) => {
    let newTasks = tasks.map((task) => (task.id === selTask.id ? selTask : task));
    if (selTask.project) {
      const [start, end] = getStartEndDateForProject(newTasks, selTask.project);
      const project = newTasks[newTasks.findIndex((t) => t.id === selTask.project)];
      if (project.start.getTime() !== start.getTime() || project.end.getTime() !== end.getTime()) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map((t) => (t.id === selTask.project ? changedProject : t));
      }
    }
    setTasks(newTasks);
  };

  const onDeleteTask = (selTask: Task) => {
    const conf = window.confirm('Are you sure about ' + selTask.name + ' ?');
    if (conf) setTasks(tasks.filter((task) => task.id !== selTask.id));
    return conf;
  };

  const onChangeProgress = async (selTask: Task) => {
    setTasks(tasks.map((task) => (task.id === selTask.id ? selTask : task)));
  };

  const onClickExpander = (selTask: Task) => {
    setTasks(tasks.map((task) => (task.id === selTask.id ? selTask : task)));
  };

  const onClickProjectRegistButton = () => {
    const dateRange = projectRange[0];
    const ganttTasks = tasks;
    const mainProject: Task = {
      start: dateRange.startDate!,
      end: dateRange.endDate!,
      name: projectName,
      id: projectName,
      progress: 0,
      type: 'project',
      hideChildren: false,
    };
    ganttTasks.push(mainProject);
    setTasks(ganttTasks);

    const ganttProjectList = ganttTasks.filter((task) => task.type === 'project');
    setProjectList(ganttProjectList);

    setIsOpenScheduleProjectRegistDialog(false);
    setProjectRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    ]);
  };

  const onClickTaskRegistButton = () => {
    const dateRange = taskRange[0];
    const ganttTask = tasks;
    const task: Task = {
      start: dateRange.startDate!,
      end: dateRange.endDate!,
      name: taskName,
      id: taskName,
      type: 'task',
      progress: 0,
      dependencies: [mandatoryCompletionTask],
      project: relatedProject,
    };

    ganttTask.push(task);
    setTasks(ganttTask);

    const ganttTaskList = ganttTask.filter((task) => task.type === 'task');
    setTaskList(ganttTaskList);

    setIsOpenScheduleTaskRegistDialog(false);
    setTaskRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    ]);
    setRelatedProject('');
    setMandatoryCompletionTask('');
  };

  const scheduleProjectRegistDialogProps: ScheduleProjectRegistDialogProps = {
    isOpenScheduleProjectRegistDialog,
    projectRange,
    onClickProjectRegistButton,
    onClickCloseButton: () => setIsOpenScheduleProjectRegistDialog(false),
    onChangeProjectName: (name: string) => setProjectname(name),
    onChangeProjectDateRange: (range: Range) => setProjectRange([range]),
  };

  const scheduleTaskRegistDialogProps: ScheduleTaskRegistDialogProps = {
    isOpenScheduleTaskRegistDialog,
    projectList,
    taskList,
    taskRange,
    relatedProject,
    mandatoryCompletionTask,
    onClickTaskRegistButton,
    onClickCloseButton: () => setIsOpenScheduleTaskRegistDialog(false),
    onChangeRelatedProject: (event: SelectChangeEvent) => setRelatedProject(event.target.value),
    onChangeMandatoryCompletionTask: (event: SelectChangeEvent) => setMandatoryCompletionTask(event.target.value),
    onChangeTaskName: (name: string) => setTaskName(name),
    onChangeTaskDateRange: (range: Range) => setTaskRange([range]),
  };

  const scheduleTemplateProps: ScheduleTemplateProps = {
    scheduleProjectRegistDialogProps,
    scheduleTaskRegistDialogProps,
    tasks,
    view,
    onClickNewProjectButton: () => setIsOpenScheduleProjectRegistDialog(true),
    onClickNewTaskButton: () => setIsOpenScheduleTaskRegistDialog(true),
    onClickExpander,
    onChangeTask,
    onChangeProgress,
    onDeleteTask,
  };
  return <ScheduleTemplate {...scheduleTemplateProps} />;
};
