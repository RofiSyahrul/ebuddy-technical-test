'use client';

import type { PropsWithChildren } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import theme from '@/theme';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
