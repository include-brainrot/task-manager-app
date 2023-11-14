import { BaseError, BaseErrorOptions } from "./base.error";

export interface ClientErrorOptions extends BaseErrorOptions {}

export class ClientError extends BaseError {
  constructor(
    error: string | BaseErrorOptions = {
      message: "Client Error: Bad Request",
      status_code: 400,
    },
    options: Partial<BaseErrorOptions> = {},
  ) {
    super(error, options);

    Object.setPrototypeOf(this, ClientError.prototype);

    // Maintains proper stack trace for thrown error (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientError);
    }
  }
}
