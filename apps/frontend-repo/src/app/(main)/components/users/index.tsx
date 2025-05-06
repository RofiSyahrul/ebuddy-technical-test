import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

import TableBody from './components/table-body';
import TableHead from './components/table-head';

export default function Users() {
  return (
    <TableContainer sx={{ maxHeight: 'calc(100vh - 90px)' }}>
      <Table stickyHeader>
        <TableHead />
        <TableBody />
      </Table>
    </TableContainer>
  );
}
