// Reacts
import React from 'react';
// UIs
import { Backdrop, CircularProgress } from '@mui/material';
// Styles
import './Loading.component.scss';

export interface LoadingComponentProps {
  isLoading: boolean;
}

export const LoadingComponent: React.FC<LoadingComponentProps> = ({ isLoading }) => {
  return (
    <Backdrop className="loading-component" open={isLoading}>
      <CircularProgress color="inherit" size={200} thickness={1.5} />
    </Backdrop>
  );
};
