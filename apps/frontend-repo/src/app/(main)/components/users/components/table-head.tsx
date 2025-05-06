import TableCell from '@mui/material/TableCell';
import THead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function TableHead() {
  return (
    <THead>
      <TableRow>
        <TableCell style={{ width: 60 }}></TableCell>
        <TableCell style={{ minWidth: 200 }}>Name</TableCell>
        <TableCell style={{ minWidth: 190 }}>Email</TableCell>
        <TableCell style={{ minWidth: 200 }}>Last Active</TableCell>
      </TableRow>
    </THead>
  );
}
