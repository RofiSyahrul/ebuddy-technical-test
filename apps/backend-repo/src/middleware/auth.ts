import { auth } from '@/config/firebase-config.js';
import type { AuthorizedRequestHandler } from '@/types/handler.js';
import { ErrorResponse } from '@/utils/response.js';

export const validateToken: AuthorizedRequestHandler = async (
  req,
  res,
  next,
) => {
  const [, token] = req.headers.authorization?.split('Bearer ') ?? [];
  if (!token) {
    throw new ErrorResponse('Unauthorized', 401);
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    res.locals.userId = decodedToken.uid;
    return next();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unauthorized';
    throw new ErrorResponse(message, 401);
  }
};
