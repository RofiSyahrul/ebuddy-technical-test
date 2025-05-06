import type { Express } from 'express';
import express from 'express';

import {
  getCurrentUser,
  getUsers,
  updateCurrentUser,
  updateUsers,
} from '@/controller/user.js';
import { validateToken } from '@/middleware/auth.js';

export default function initUserRoutes(app: Express): Express {
  const router = express.Router();
  router
    .use(validateToken)
    .get('', getUsers)
    .put('', updateUsers)
    .get('/current', getCurrentUser)
    .put('/current', updateCurrentUser);
  app.use('/api/users', router);
  return app;
}
