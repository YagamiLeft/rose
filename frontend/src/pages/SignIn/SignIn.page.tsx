// Reacts
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Template
import { SignInTemplate, SignInTemplateProps } from '../../component/templates/SignIn/SignIn.template';
// Interfaces
import { SnackBarComponentProps } from '../../component/organisms/common/SnackBar/SnackBar.component';
import { LoadingComponentProps } from '../../component/organisms/common/Loading/Loading.component';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // SnackBarComponent States
  const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);
  // LoadinComponent States
  const [isLoading, setIsLoading] = useState(false);

  const onClickCloseSnackBar = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setIsOpenSnackBar(false);
  };

  const onClickSignInButton = () => {
    setIsLoading(true);
    const isMatchAccount = userName === 'admin' && password === 'admin';
    isMatchAccount ? navigate('/home') : setIsOpenSnackBar(true);
    setIsLoading(false);
  };

  const onChangeUserName = (userName: string) => {
    setUserName(userName);
  };

  const onChangePassword = (password: string) => {
    setPassword(password);
  };

  const snackBarComponentProps: SnackBarComponentProps = {
    isOpenSnackBar,
    severity: 'error',
    message: 'Incorrect username or password',
    onClickCloseSnackBar,
  };

  const loadingComponentProps: LoadingComponentProps = {
    isLoading,
  };

  const signInTemplateProps: SignInTemplateProps = {
    snackBarComponentProps,
    loadingComponentProps,
    onClickSignInButton,
    onChangeUserName,
    onChangePassword,
  };

  return <SignInTemplate {...signInTemplateProps} />;
};
