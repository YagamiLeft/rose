// Reacts
import React from 'react';
// UIs
import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// Styles
import './Header.component.scss';

export const HeaderComponent: React.FC = () => {
  return (
    <Box className="header-component">
      <AppBar className="header-bar" position="static" elevation={10}>
        <Toolbar>
          <IconButton className="menu-icon" size="large" edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography className="bar-typography" variant="h6" component="div">
            Rose
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
