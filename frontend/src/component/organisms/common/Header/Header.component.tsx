// Reacts
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// UIs
import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu } from '@material-ui/icons';
// Component
import { MenuComponent } from '../Menu/Menu.component';
// Styles
import './Header.component.scss';

export const HeaderComponent: React.FC = () => {
  const pathName = useLocation().pathname;
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <Box className="header-component">
      <AppBar className="header-bar" position="static">
        <Toolbar>
          {pathName !== '/' && (
            <IconButton
              className="menu-icon"
              size="large"
              edge="start"
              color="inherit"
              onClick={() => setIsOpenMenu(true)}
            >
              <Menu />
            </IconButton>
          )}
          <Typography className="bar-typography" variant="h6" component="div">
            Rose
          </Typography>
        </Toolbar>
      </AppBar>

      <MenuComponent isOpenMenu={isOpenMenu} onCloseMenu={() => setIsOpenMenu(false)} />
    </Box>
  );
};
