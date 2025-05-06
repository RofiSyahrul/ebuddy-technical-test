'use client';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthTabs() {
  const pathname = usePathname();
  const tabValue = pathname === '/register' ? 'register' : 'login';

  return (
    <Tabs variant='fullWidth' value={tabValue}>
      <Tab LinkComponent={Link} href='/login' label='Login' value='login' />
      <Tab
        LinkComponent={Link}
        href='/register'
        label='Register'
        value='register'
      />
    </Tabs>
  );
}
