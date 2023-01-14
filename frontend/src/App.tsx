// Reacts
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Pages
import { LoginPage } from './pages/Login/Login.page';
// UIs
import { Box } from '@mui/material';
import { HeaderComponent } from './component/common/Header/Header.component';
// Styles
import './App.scss';

export const App: React.FC = () => {
  return (
    <Box>
      <HeaderComponent />
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
