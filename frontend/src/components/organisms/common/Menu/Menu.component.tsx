// Reacts
import React from 'react';
// UIs
import { Drawer, Box, Avatar, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Apps, ContactMail, AssignmentInd, Home } from '@material-ui/icons';
// Styles
import './Menu.component.scss';

interface MenuComponentProps {
  isOpenMenu: boolean;
  onCloseMenu: () => void;
}

export const MenuComponent: React.FC<MenuComponentProps> = ({ isOpenMenu, onCloseMenu }) => {
  const listItems = [
    {
      listIcon: <Home />,
      listText: 'Home',
    },
    {
      listIcon: <AssignmentInd />,
      listText: 'Resume',
    },
    {
      listIcon: <Apps />,
      listText: 'Portfolio',
    },
    {
      listIcon: <ContactMail />,
      listText: 'Contacts',
    },
  ];

  return (
    <Drawer className="menu-component" open={isOpenMenu} anchor="left" onClose={onCloseMenu}>
      <Box className="side-menu">
        <Avatar className="menu-avater" src="https://i.ibb.co/rx5DFbs/avatar.png" alt="Juaneme8" />
        <Divider />
        <List>
          {listItems.map((listItem, index) => (
            <ListItem className="list-item" key={index}>
              <ListItemIcon className="list-item">{listItem.listIcon}</ListItemIcon>
              <ListItemText className="list-item" primary={listItem.listText} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
