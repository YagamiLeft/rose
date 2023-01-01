import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LoginPage } from './pages/Login/Login.page';
import './App.scss';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
