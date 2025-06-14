import * as React from 'react';
import {Button,Box,List,ListItemButton,ListItemIcon,ListItemText} from '@mui/material';
import Divider from '@mui/material/Divider';
import { signOut } from 'next-auth/react';

export default function SelectedListItem({selectedIndex,setSelectedIndex}) {

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className='absolute fixed left-0 top-13 h-screen bg-black z-40 text-white p-2'>
    <Box sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.gray-300' }}>
      <List component="nav" aria-label="main mailbox folders" >
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="DMs" />
        </ListItemButton>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder" className='m-3 p-3'>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Spam" />
        </ListItemButton>

      </List>
      <Button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="fixed top-35 rounded-full absolute signout-button"
        variant='contained'
      >
        Sign Out
      </Button>
    </Box>
    </div>
  );
}
