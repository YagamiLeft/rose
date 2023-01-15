// Reacts
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Pages
import { SignInPage } from './pages/SignIn/SignIn.page';
import { HomePage } from './pages/Home/Home.page';
// Styles
import './App.scss';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<SignInPage />} />
        <Route path={`/home`} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
