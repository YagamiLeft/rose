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
import { ScheduleTaskDeleteDailogComponent } from '../../components/organisms/specific/ScheduleTaskDeleteDialog/ScheduleTaskDeleteDialog.component';

export const SchedulePage: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [projectName, setProjectname] = useState('');
  const [taskName, setTaskName] = useState('');

  const [columnWidth, setColumnWidth] = useState(60);

  // ScheduleProjectRegistDialog States
  const [isOpenScheduleProjectRegistDialog, setIsOpenScheduleProjectRegistDialog] = useState(false);
  const [projectRange, setProjectRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  // ScheduleTaskRegistDialog States
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
  // ScheduleTaskDeleteDialog States
  const [isOpenScheduleTaskDeleteDialog, setIsOpenScheduleTaskDeleteDialog] = useState(false);

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
    const endDate = dateRange.endDate!;
    endDate.setHours(23, 59, 59);
    const mainProject: Task = {
      start: dateRange.startDate!,
      end: endDate,
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
    const endDate = dateRange.endDate!;
    endDate.setHours(23, 59, 59);
    const task: Task = {
      start: dateRange.startDate!,
      end: endDate,
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

  const onChangeViewMode = (viewMode: ViewMode) => {
    setView(viewMode);
    if (ViewMode.Day) {
      setColumnWidth(60);
    } else if (ViewMode.Month) {
      setColumnWidth(300);
    } else {
      setColumnWidth(250);
    }
  };

  const onClickDeleteTask = (taskIndex: number) => {
    const deleteSpecificTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(deleteSpecificTasks);

    const onlyTaskList = deleteSpecificTasks.filter((task) => task.type === 'task');
    setTaskList(onlyTaskList);
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
  const scheduleTaskDeleteDialogProps: ScheduleTaskDeleteDailogComponent = {
    isOpenScheduleTaskDeleteDialog,
    tasks,
    onClickCloseButton: () => setIsOpenScheduleTaskDeleteDialog(false),
    onClickDeleteTask,
  };
  const scheduleTemplateProps: ScheduleTemplateProps = {
    scheduleProjectRegistDialogProps,
    scheduleTaskRegistDialogProps,
    scheduleTaskDeleteDialogProps,
    tasks,
    view,
    columnWidth,
    onClickNewProjectButton: () => setIsOpenScheduleProjectRegistDialog(true),
    onClickNewTaskButton: () => setIsOpenScheduleTaskRegistDialog(true),
    onClickDeleteTaskButton: () => setIsOpenScheduleTaskDeleteDialog(true),
    onClickExpander,
    onChangeTask,
    onChangeProgress,
    onChangeViewMode,
    onDeleteTask,
  };
  return <ScheduleTemplate {...scheduleTemplateProps} />;
};
