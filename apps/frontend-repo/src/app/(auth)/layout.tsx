import type { ReactNode } from 'react';

import BaseBox from '@mui/material/Box';

import AuthTabs from './auth-tabs';
import { Box } from './styles';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <BaseBox
      display='flex'
      alignItems='center'
      height='100vh'
      width='100vw'
      padding='0 8px'
    >
      <Box>
        <AuthTabs />
        {children}
      </Box>
    </BaseBox>
  );
}
