import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Profile from './components/profile';
import RefreshButton from './components/refresh-button';

export default function Header() {
  return (
    <AppBar color='default' position='sticky'>
      <Toolbar sx={{ py: '8px' }} variant='regular'>
        <RefreshButton />
        <Box flexGrow={1} />
        <Profile />
      </Toolbar>
    </AppBar>
  );
}
