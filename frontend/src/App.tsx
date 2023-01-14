// Reacts
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Pages
import { SignInPage } from './pages/SignIn/SignIn.page';
import { HomePage } from './pages/Home/Home.page';
// UIs
import { Box } from '@mui/material';
import { HeaderComponent } from './component/organisms/common/Header/Header.component';
// Styles
import './App.scss';

export const App: React.FC = () => {
  return (
    <Box>
      <HeaderComponent />
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<SignInPage />} />
          <Route path={`/home`} element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
