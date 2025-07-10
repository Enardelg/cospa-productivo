import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Layout = ({ children, toggleColorMode, mode }) => (
    <Box>
        <AppBar position="static" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src="./public/logoNavBar.png" alt="Logo CoSpa" style={{ width: 30, height: 30}} />
        <Typography variant="h6" noWrap>
         CoSpa Masajes | Gestión de Fichas Clínicas
        </Typography>
    </Box>
        <IconButton onClick={toggleColorMode} color="inherit">
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
    <Box component="main" sx={{ py: 4 }}>
      {children}
    </Box>
  </Box>
);

export default Layout;
