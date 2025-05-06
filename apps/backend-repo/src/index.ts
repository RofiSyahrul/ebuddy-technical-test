/* eslint-disable no-console */
import { deleteApp } from 'firebase-admin/app';

import { firebaseApp } from './config/firebase-config.js';
import app from './core/app.js';

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server is listening on: ${PORT}`);
  console.log('  Press CTRL-C to stop\n');
});

server.on('close', () => {
  deleteApp(firebaseApp);
});
