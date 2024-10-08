import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Header() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Sewa Kos Online
        </Typography>
        <Button color='inherit'>Login</Button>
        <Button color='inherit'>Register</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
