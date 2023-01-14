// Reacts
import React from 'react';
// UIs
import { Snackbar, Alert, AlertColor } from '@mui/material';
// Styles
import './SnackBar.component.scss';

export interface SnackBarComponentProps {
  isOpenSnackBar: boolean;
  severity: AlertColor;
  message: string;
  onClickCloseSnackBar: () => void;
}

export const SnackBarComponent: React.FC<SnackBarComponentProps> = ({
  isOpenSnackBar,
  message,
  severity,
  onClickCloseSnackBar,
}) => {
  return (
    <Snackbar
      className="snackbar-component"
      open={isOpenSnackBar}
      autoHideDuration={5000}
      onClose={onClickCloseSnackBar}
    >
      <Alert
        className="alert-area"
        onClose={onClickCloseSnackBar}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
