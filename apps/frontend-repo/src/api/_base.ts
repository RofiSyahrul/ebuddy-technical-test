import 'server-only';

import { getAuthTokenCookie } from '@/lib/auth-token-cookie';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Body = Record<string, any>;
export type Query = Record<string, unknown>;

interface Options<TQuery extends Query = Query, TBody extends Body = Body> {
  body?: TBody;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  query?: TQuery;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function getURL<TQuery extends Query>(url: string, query?: TQuery) {
  const fullURL = new URL(url, BASE_URL);
  if (query && typeof query === 'object') {
    for (const key in query) {
      const value = query[key];
      if (value) fullURL.searchParams.append(key, String(value));
    }
  }
  return fullURL.href;
}

async function getRequestHeaders() {
  const headers = new Headers();
  const authToken = await getAuthTokenCookie();
  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }
  headers.set('Content-Type', 'application/json');
  return headers;
}

export class FetchError extends Error {
  constructor(public response: Response) {
    super(response.statusText);
    this.name = 'FetchError';
  }

  async #setMessageFromResponseText() {
    try {
      this.message = await this.response.clone().text();
    } catch {
      this.message = this.response.statusText;
    }
  }

  public async parseErrorMessage() {
    try {
      if (this.response.headers?.get('Content-Type')?.includes('text')) {
        await this.#setMessageFromResponseText();
        return;
      }

      const data = await this.response.clone().json();
      if (typeof data === 'string') {
        this.message = data;
        return;
      }

      if (typeof data?.message === 'string') {
        this.message = data.message;
        return;
      }

      if (typeof data?.error === 'string') {
        this.message = data.error;
        return;
      }

      this.message = JSON.stringify(data);
    } catch {
      await this.#setMessageFromResponseText();
    }
  }
}

export async function fetcher<
  TData = unknown,
  TQuery extends Query = Query,
  TBody extends Body = Body,
>(url: string, options: Options<TQuery, TBody> = {}): Promise<TData> {
  const finalURL = getURL(url, options.query);
  const body = options.body ? JSON.stringify(options.body) : undefined;
  const headers = await getRequestHeaders();

  const response = await fetch(finalURL, {
    body,
    headers,
    method: options.method,
  });

  if (response.status >= 400 && response.status < 600) {
    const error = new FetchError(response);
    await error.parseErrorMessage();
    throw error;
  }

  const data: TData = await response.json();
  return data;
}
