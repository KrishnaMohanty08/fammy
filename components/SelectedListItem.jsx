import * as React from 'react';
import { Button, Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import { signOut } from 'next-auth/react';

export default function SelectedListItem({ selectedIndex, setSelectedIndex }) {

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className='absolute fixed left-0 top-12 -z-5 h-screen bg-black z-40 text-white p-2'>
      <Box sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.gray-300' }}>
        <List component="nav" aria-label="main mailbox folders" >
          <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
            <ListItemText primary="Inbox" />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
            <ListItemText primary="DMs" />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </List>


        <Button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="fixed top-50 rounded-full absolute signout-button"
          variant='contained'
        >
          Sign Out
        </Button>
      </Box>
    </div>
  );
}
