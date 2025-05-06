import cors from 'cors';
import type { ErrorRequestHandler } from 'express';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import initAuthRoutes from '@/routes/auth.js';
import initUserRoutes from '@/routes/user.js';

const ALLOWED_ORIGIN = process.env.CORS_ALLOWED_ORIGIN;

const app: express.Express = express();

app
  .use(express.json())
  .use(morgan('dev'))
  .use(helmet())
  .use(cors({ origin: ALLOWED_ORIGIN ? new RegExp(ALLOWED_ORIGIN) : '*' }));

initAuthRoutes(app);
initUserRoutes(app);

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (error instanceof Error) {
    const status =
      'status' in error && typeof error.status === 'number'
        ? error.status
        : 500;
    res.status(status).json({
      data: null,
      message: error.message,
    });
    return;
  }
  next(error);
};

app.use(errorHandler);

export default app;
