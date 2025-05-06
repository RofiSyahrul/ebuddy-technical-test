'use client';

import BaseBox from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Box = styled(BaseBox)`
  display: flex;
  flex-direction: column;
  height: 320px;
  width: 100%;
  max-width: 768px;
  margin: auto;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};

  ${({ theme }) => theme.breakpoints.up('sm')} {
    height: 270px;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    height: 170px;
  }
`;
