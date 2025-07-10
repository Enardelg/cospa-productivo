import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Home from './pages/Home';

const App = () => {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: { main: '#1976d2' },
        background: {
          default: mode === 'light' ? '#f5f5f5' : '#121212',
          paper: mode === 'light' ? '#ffffff' : '#1e1e1e'
        }
      },
      shape: { borderRadius: 12 },
      typography: { fontFamily: 'Roboto, sans-serif' }
    }), [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home mode={mode} toggleColorMode={() => setMode(m => m === 'light' ? 'dark' : 'light')} />
    </ThemeProvider>
  );
};

export default App;
