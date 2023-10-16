import { BaseError, BaseErrorOptions } from "./base.error";

export interface ServerErrorOptions extends BaseErrorOptions {}

export class ServerError extends BaseError {
  constructor(
    error: string | BaseErrorOptions = {
      message: "Server Error: Internal Server Error",
      status_code: 500,
    },
    options: Partial<BaseErrorOptions> = {},
  ) {
    super(error, options);

    Object.setPrototypeOf(this, BaseError.prototype);

    // Maintains proper stack trace for thrown error (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseError);
    }
  }
}
