// Reacts
import React from 'react';
// UIs
import { Container, Box, Card, Typography } from '@mui/material';
// Components
import { SnackBarComponent, SnackBarComponentProps } from '../../organisms/common/SnackBar/SnackBar.component';
import { LoadingComponent, LoadingComponentProps } from '../../organisms/common/Loading/Loading.component';
// Consts
import { leafs } from '../../../const/const';
// Styles
import './SignIn.template.scss';

export interface SignInTemplateProps {
  snackBarComponentProps: SnackBarComponentProps;
  loadingComponentProps: LoadingComponentProps;
  onClickSignInButton: () => void;
  onChangeUserName: (userName: string) => void;
  onChangePassword: (password: string) => void;
}

export const SignInTemplate: React.FC<SignInTemplateProps> = ({
  snackBarComponentProps,
  loadingComponentProps,
  onClickSignInButton,
  onChangeUserName,
  onChangePassword,
}) => {
  return (
    <Container component="main" maxWidth={false} className="signin-template">
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
            <input className="form-input" placeholder="User Name" onChange={(e) => onChangeUserName(e.target.value)} />
          </Box>
          <Box className="form-item">
            <Typography>password</Typography>
            <input
              className="form-input"
              type="password"
              placeholder="Password"
              onChange={(e) => onChangePassword(e.target.value)}
            />
          </Box>
          <Box className="button-panel">
            <button className="signin-button" onClick={onClickSignInButton}>
              Sign In
            </button>
          </Box>
        </Box>
        <Box className="form-footer">
          <Typography className="footer-item">Create an account</Typography>
          <Typography className="footer-item">Forgot password?</Typography>
        </Box>
      </Card>

      <LoadingComponent {...loadingComponentProps} />
      <SnackBarComponent {...snackBarComponentProps} />
    </Container>
  );
};
