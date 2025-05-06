'use client';

import { useActionState, useCallback } from 'react';

import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';

import { getUsers } from '@/api/user';
import { useAppDispatch } from '@/store/hooks';
import { replaceUsersData } from '@/store/users/users-slice';

export default function RefreshButton() {
  const dispatch = useAppDispatch();

  const handleRefresh = useCallback(async () => {
    const newUsers = await getUsers({ page: 1 });
    dispatch(replaceUsersData(newUsers));
  }, [dispatch]);

  const [_, action, isPending] = useActionState(handleRefresh, undefined);

  return (
    <form action={action}>
      <IconButton
        color='primary'
        disabled={isPending}
        size='large'
        title='Refresh User Data'
        type='submit'
      >
        {isPending ? (
          <CircularProgress color='inherit' size={36} />
        ) : (
          <RefreshIcon fontSize='large' />
        )}
      </IconButton>
    </form>
  );
}
