// Reacts
import React from 'react';
import { useNavigate } from 'react-router-dom';
// UIs
import { Drawer, Box, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AccountCircle, Home, Schedule } from '@material-ui/icons';
import AddTaskIcon from '@mui/icons-material/AddTask';
// Styles
import './Menu.component.scss';

interface MenuComponentProps {
  isOpenMenu: boolean;
  onCloseMenu: () => void;
}

export const MenuComponent: React.FC<MenuComponentProps> = ({ isOpenMenu, onCloseMenu }) => {
  const navigate = useNavigate();
  const listItems = [
    {
      listIcon: <Home />,
      listText: 'Home',
      navigate: () => navigate('/home'),
    },
    {
      listIcon: <AddTaskIcon />,
      listText: 'TaskBoard',
      navigate: () => navigate('/task-board'),
    },
    {
      listIcon: <Schedule />,
      listText: 'Schedule',
      navigate: () => navigate('/schedule'),
    },
  ];

  return (
    <Drawer className="menu-component" open={isOpenMenu} anchor="left" onClose={onCloseMenu}>
      <Box className="side-menu">
        <Box className="menu-avater">
          <AccountCircle fontSize="large" />
        </Box>
        <Divider />
        <List>
          {listItems.map((listItem, index) => (
            <ListItem className="list-item" key={index} onClick={listItem.navigate}>
              <ListItemIcon className="list-item">{listItem.listIcon}</ListItemIcon>
              <ListItemText className="list-item" primary={listItem.listText} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
