// Reacts
import React from 'react';
// UIs
import { Box, Button, Card, Container, Input, Typography } from '@mui/material';
// Styles
import './Login.page.scss';
// Consts
import { leafs } from '../../const/const';

export const LoginPage: React.FC = () => {
  return (
    <Container component="main" maxWidth={false} className="login-page">
      <Box className="leaf">
        {leafs.map((item) => (
          <li key={item} />
        ))}
      </Box>

      <Card className="form-card">
        <Typography className="card-title">Sign In</Typography>
        <Box className="form-box">
          <Box className="form-item">
            <Typography>username</Typography>
            <input className="form-input" placeholder="User Name" />
          </Box>
          <Box className="form-item">
            <Typography>password</Typography>
            <input className="form-input" type="password" placeholder="Password"></input>
          </Box>
          <Box className="button-panel">
            <button className="signin-button">Sign In</button>
          </Box>
        </Box>
        <Box className="form-footer">
          <Typography className="footer-item">Create an account</Typography>
          <Typography className="footer-item">Forgot password?</Typography>
        </Box>
      </Card>
    </Container>
  );
};
