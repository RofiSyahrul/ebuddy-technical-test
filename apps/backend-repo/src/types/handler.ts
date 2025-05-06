import type { RequestHandler } from 'express';

interface ParsedQs {
  [key: string]: undefined | string | ParsedQs | (string | ParsedQs)[];
}

export type AuthorizedRequestHandler<
  P = Record<string, string>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = ParsedQs,
> = RequestHandler<P, ResBody, ReqBody, ReqQuery, { userId: string }>;
