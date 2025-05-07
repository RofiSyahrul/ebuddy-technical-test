import type { ChangeEventHandler } from 'react';
import { useCallback, useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

import type { UpdateUserPayload, UserResponseItem } from '@repo/dto/user';

import { useAppDispatch } from '@/store/hooks';
import { updateUser } from '@/store/users/users-slice';

function ActionCell({
  id,
  isEditMode,
  onToggle,
  rollbackable,
}: {
  id: string;
  isEditMode: boolean;
  onToggle: () => void;
  rollbackable: boolean;
}) {
  const dispatch = useAppDispatch();

  const handleRollback = useCallback(() => {
    dispatch(updateUser({ id: id, name: undefined }));
  }, [id, dispatch]);

  return (
    <TableCell align='center'>
      {rollbackable && (
        <IconButton
          color='warning'
          onClick={handleRollback}
          size='small'
          title='Rollback Changes'
        >
          <SettingsBackupRestoreIcon fontSize='inherit' />
        </IconButton>
      )}
      {isEditMode ? (
        <IconButton
          color='success'
          onClick={onToggle}
          size='small'
          title='Temporary Save'
        >
          <CheckIcon fontSize='inherit' />
        </IconButton>
      ) : (
        <IconButton color='info' onClick={onToggle} size='small' title='Edit'>
          <EditIcon fontSize='inherit' />
        </IconButton>
      )}
    </TableCell>
  );
}

function FieldEditor({
  action,
  id,
  field,
  value,
}: {
  action: () => void;
  id: string;
  field: keyof UpdateUserPayload;
  value: string;
}) {
  const dispatch = useAppDispatch();

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      dispatch(updateUser({ id, [field]: event.target.value }));
    },
    [dispatch, id, field],
  );

  return (
    <form action={action}>
      <TextField
        autoComplete='off'
        autoFocus={field === 'name'}
        onChange={handleChange}
        size='small'
        slotProps={{
          input: {
            slotProps: {
              input: {
                sx: { p: '4px' },
              },
            },
          },
        }}
        value={value}
      />
    </form>
  );
}

export default function Row({
  data,
  hasChanged,
}: {
  data: UserResponseItem;
  hasChanged: boolean;
}) {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
  }, []);

  return (
    <TableRow hover>
      <ActionCell
        id={data.id}
        isEditMode={isEditMode}
        onToggle={toggleEditMode}
        rollbackable={hasChanged}
      />
      <TableCell>
        {isEditMode ? (
          <FieldEditor
            action={toggleEditMode}
            id={data.id}
            field='name'
            value={data.name}
          />
        ) : (
          data.name
        )}
      </TableCell>
      <TableCell>{data.email}</TableCell>
      <TableCell>
        {dayjs(data.lastActive).format('DD-MM-YYYY HH:mm:ss')}
      </TableCell>
    </TableRow>
  );
}
