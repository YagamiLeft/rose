// Reacts
import React from 'react';
// UIs
import { Container } from '@mui/material';
// Components
import { HeaderComponent } from '../../organisms/common/Header/Header.component';
// Styles
import './Home.template.scss';

export const HomeTemplate: React.FC = () => {
  return (
    <>
      <HeaderComponent />
      <Container component="main" maxWidth={false} className="home-template">
        aaa
      </Container>
    </>
  );
};
