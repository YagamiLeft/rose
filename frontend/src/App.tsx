// Reacts
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Pages
import { SignInPage } from './pages/SignIn/SignIn.page';
import { HomePage } from './pages/Home/Home.page';
import { TaskBoardPage } from './pages/TaskBoard/TaskBoard.page';
import { SchedulePage } from './pages/Schedule/Schedule.page';
// Styles
import './App.scss';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<SignInPage />} />
        <Route path={`/home`} element={<HomePage />} />
        <Route path={`/task-board`} element={<TaskBoardPage />} />
        <Route path={`/schedule`} element={<SchedulePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
