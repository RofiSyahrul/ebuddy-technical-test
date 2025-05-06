export class ErrorResponse extends Error {
  constructor(
    message: string,
    public status = 500,
  ) {
    super(message);
  }
}

export interface SuccessResponse<T> {
  data: T;
}

export function successResponse<T>(data: T): SuccessResponse<T> {
  return { data };
}
