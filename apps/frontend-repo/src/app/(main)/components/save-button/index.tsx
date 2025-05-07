'use client';

import { useActionState, useCallback } from 'react';

import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import { useTheme } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { saveAllUsersChanges } from '@/store/users/users-slice';

import { saveChanges } from './actions';

export default function SaveButton() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { current, dataMap } = useAppSelector((state) => state.users.updated);

  const hasUpdatedData = !!(current || Object.keys(dataMap).length);

  const { enteringScreen: enterDuration, leavingScreen: leaveDuration } =
    theme.transitions.duration;

  const handleSave = useCallback(async () => {
    await saveChanges({ current, dataMap });
    dispatch(saveAllUsersChanges());
  }, [current, dataMap, dispatch]);

  const [_, action, isPending] = useActionState(handleSave, undefined);

  return (
    <form action={action}>
      <Zoom
        in={hasUpdatedData}
        style={{ transitionDelay: `${hasUpdatedData ? leaveDuration : 0}ms` }}
        timeout={{ enter: enterDuration, exit: leaveDuration }}
        unmountOnExit
      >
        <Fab
          color='success'
          disabled={isPending}
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          title='Save Changes'
          type='submit'
        >
          {isPending ? (
            <CircularProgress color='inherit' size={35} />
          ) : (
            <SaveIcon fontSize='large' />
          )}
        </Fab>
      </Zoom>
    </form>
  );
}
