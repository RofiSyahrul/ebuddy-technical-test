import type { Express } from 'express';
import express from 'express';

import { register, signIn } from '@/controller/auth.js';
import { validateToken } from '@/middleware/auth.js';

export default function initAuthRoutes(app: Express): Express {
  const router = express.Router();
  router
    .use(validateToken)
    .post('/register', register)
    .post('/sign-in', signIn);
  app.use('/api/auth', router);
  return app;
}
