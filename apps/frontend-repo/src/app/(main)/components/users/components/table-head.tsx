import TableCell from '@mui/material/TableCell';
import THead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function TableHead() {
  return (
    <THead>
      <TableRow>
        <TableCell align='center' style={{ minWidth: 100 }}>
          Actions
        </TableCell>
        <TableCell style={{ minWidth: 200 }}>Name</TableCell>
        <TableCell style={{ minWidth: 190 }}>Email</TableCell>
        <TableCell style={{ minWidth: 200 }}>Last Active</TableCell>
      </TableRow>
    </THead>
  );
}
