// Reacts
import React, { useState } from 'react';
// Template
import { TaskBoardTemplate, TaskBoardTemplateProps } from '../../components/templates/TaskBoard/TaskBoard.template';
// Interfaces
import { MemoTaskRegistDialogComponentProps } from '../../components/organisms/specific/MemoTaskRegistDialog/MemoTaskRegistDialog.component';
import { TaskAreaComponentProps } from '../../components/organisms/specific/TaskArea/TaskArea.component';

interface TaskItem {
  taskTitle: string;
  taskDetail: string;
}

export const TaskBoardPage: React.FC = () => {
  // TaskAreaComponent States
  const [todoTasks, setTodoTasks] = useState<TaskItem[]>([]);
  const [doingTasks, setDoingTasks] = useState<TaskItem[]>([]);
  const [doneTasks, setDoneTasks] = useState<TaskItem[]>([]);

  // TaskRegistDialogComponent States
  const [isOpenDialog, setIsOpenDoalog] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDetail, setTaskDetail] = useState('');

  const onCkickRegistTask = () => {
    const todos = todoTasks;
    const newTaskItem: TaskItem = {
      taskTitle,
      taskDetail,
    };
    todos.push(newTaskItem);
    setTodoTasks(todos);
    setIsOpenDoalog(false);
  };

  const onClickForwardButton = (taskIndex: number, next: string) => {
    if (next === 'DOING') {
      const task = todoTasks[taskIndex];
      const todos = todoTasks.filter((_, index) => index !== taskIndex);
      const doings = doingTasks;
      doings.push(task);
      setTodoTasks(todos);
      setDoingTasks(doings);
    } else {
      const task = doingTasks[taskIndex];
      const doings = doingTasks.filter((_, index) => index !== taskIndex);
      const dones = doneTasks;
      dones.push(task);
      setDoingTasks(doings);
      setDoneTasks(dones);
    }
  };

  const todoTaskAreaComponentProps: TaskAreaComponentProps = {
    title: 'TODO',
    taskItems: todoTasks,
    onClickAddTaskButton: () => setIsOpenDoalog(true),
    onClickForwardButton,
  };
  const doingTaskAreaComponentProps: TaskAreaComponentProps = {
    title: 'DOING',
    taskItems: doingTasks,
    onClickForwardButton,
  };
  const doneTaskAreaComponentProps: TaskAreaComponentProps = {
    title: 'DONE',
    taskItems: doneTasks,
    onClickForwardButton,
  };

  const memoTaskRegistDialogComponentProps: MemoTaskRegistDialogComponentProps = {
    isOpenDialog,
    onCkickRegistTask,
    onClickCloseDialog: () => setIsOpenDoalog(false),
    onChangeTaskTitle: (title: string) => setTaskTitle(title),
    onChangeTaskDetail: (detail: string) => setTaskDetail(detail),
  };

  const taskBoardTemplateProps: TaskBoardTemplateProps = {
    todoTaskAreaComponentProps,
    doingTaskAreaComponentProps,
    doneTaskAreaComponentProps,
    memoTaskRegistDialogComponentProps,
  };

  return <TaskBoardTemplate {...taskBoardTemplateProps} />;
};
