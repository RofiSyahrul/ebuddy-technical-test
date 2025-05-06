import { useCallback, useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';

import type { UserResponseItem } from '@repo/dto/user';

function EditModeActions({ onClose }: { onClose: () => void }) {
  // TODO
  return <Box></Box>;
}

export default function Row({ data }: { data: UserResponseItem }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
  }, []);

  return (
    <TableRow hover>
      <TableCell>
        <IconButton
          color='info'
          onClick={toggleEditMode}
          size='small'
          title='Edit'
        >
          <EditIcon fontSize='inherit' />
        </IconButton>
      </TableCell>
      <TableCell>{data.name}</TableCell>
      <TableCell>{data.email}</TableCell>
      <TableCell>
        {dayjs(data.lastActive).format('DD-MM-YYYY HH:mm:ss')}
      </TableCell>
    </TableRow>
  );
}
