'use client';

import type { ChangeEventHandler } from 'react';
import { useCallback, useMemo, useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { removeAuthTokenCookieAndRedirect } from '@/lib/auth-token-cookie';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectCurrentUserName,
  updateCurrentUser,
} from '@/store/users/users-slice';

const NAME_WIDTH = 130;

function stringToColor(value: string) {
  let hash = 0;
  let i;

  for (i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function LetterAvatar() {
  const name = useAppSelector(selectCurrentUserName);

  const { bgColor, initial } = useMemo(() => {
    const bgColor = stringToColor(name);
    const words = name.split(' ');
    return {
      bgColor,
      initial: [words[0], words.length < 2 ? '' : words[words.length - 1]]
        .map((word) => word.charAt(0).toUpperCase())
        .join(''),
    };
  }, [name]);

  return (
    <Avatar
      sx={{
        backgroundColor: bgColor,
        color: (theme) => theme.palette.getContrastText(bgColor),
        height: 48,
        width: 48,
      }}
      slotProps={{ root: { title: name } }}
    >
      {initial}
    </Avatar>
  );
}

function StaticName({ onEdit }: { onEdit: () => void }) {
  const name = useAppSelector(selectCurrentUserName);
  return (
    <>
      <Typography fontWeight={600} noWrap textAlign='center' width={NAME_WIDTH}>
        {name}
      </Typography>
      <IconButton color='info' onClick={onEdit} size='small' title='Edit'>
        <EditIcon fontSize='small' />
      </IconButton>
    </>
  );
}

function NameFieldEditor({ onClose }: { onClose: () => void }) {
  const name = useAppSelector(selectCurrentUserName);
  const dispatch = useAppDispatch();

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      dispatch(updateCurrentUser({ name: event.target.value }));
    },
    [dispatch],
  );

  const handleRollback = useCallback(() => {
    dispatch(updateCurrentUser({ name: '' }));
    onClose();
  }, [dispatch, onClose]);

  return (
    <form action={onClose}>
      <TextField
        autoFocus
        onChange={handleChange}
        value={name}
        slotProps={{
          input: {
            endAdornment: (
              <Box display='flex' alignItems='center' gap='2px'>
                <IconButton
                  color='success'
                  size='small'
                  title='Temporary Save'
                  sx={{ p: '0' }}
                  type='submit'
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  color='error'
                  onClick={handleRollback}
                  size='small'
                  title='Rollback Changes'
                  sx={{ p: '0' }}
                  type='button'
                >
                  <SettingsBackupRestoreIcon />
                </IconButton>
              </Box>
            ),
            slotProps: {
              input: {
                sx: { py: '5px' },
              },
            },
            sx: {
              p: '0',
            },
          },
        }}
        sx={{ width: NAME_WIDTH + 34 }}
        size='small'
      />
    </form>
  );
}

export default function Profile() {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
  }, []);

  return (
    <Box alignItems='center' display='flex' gap='8px'>
      <LetterAvatar />
      <Box>
        <Box
          display='flex'
          alignItems='center'
          gap='4px'
          pb='2px'
          mb='4px'
          borderBottom={(theme) => `1px solid ${theme.palette.divider}`}
        >
          {isEditMode ? (
            <NameFieldEditor onClose={toggleEditMode} />
          ) : (
            <StaticName onEdit={toggleEditMode} />
          )}
        </Box>
        <Button
          color='error'
          fullWidth
          onClick={removeAuthTokenCookieAndRedirect}
          size='small'
          startIcon={<LogoutIcon />}
          variant='outlined'
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
