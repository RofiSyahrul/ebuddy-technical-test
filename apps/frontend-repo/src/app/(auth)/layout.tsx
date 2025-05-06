import type { ReactNode } from 'react';

import BaseBox from '@mui/material/Box';
import { redirect, RedirectType } from 'next/navigation';

import { getCurrentUser } from '@/api/user';

import AuthTabs from './auth-tabs';
import { Box } from './styles';

async function checkIsLoggedIn() {
  try {
    await getCurrentUser();
    return true;
  } catch {
    return false;
  }
}

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isLoggedIn = await checkIsLoggedIn();
  if (isLoggedIn) {
    redirect('/', RedirectType.replace);
  }

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
