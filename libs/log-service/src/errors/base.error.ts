export interface BaseErrorOptions extends ErrorOptions {
  message: string;
  internal_message?: string | object;
  status_code?: number;
}

export class BaseError extends Error implements BaseErrorOptions {
  public message: string;
  public internal_message?: string | object;
  public status_code: number;
  public status: string | number;

  constructor(
    error: string | BaseErrorOptions = {
      message: "Server Error: Generic Unknown Server Error",
      status_code: 500,
    },
    options: Partial<BaseErrorOptions> = {},
  ) {
    if (typeof error === "string") {
      super(options.message ?? error, options);
      this.message = error;
      this.status_code = options.status_code || 1;
      this.internal_message = options.internal_message;
    } else {
      super(error.message, options);
      this.message = error.message ?? options.message;
      this.status_code = error.status_code ?? (options.status_code || 1);
      this.internal_message =
        error.internal_message ?? options.internal_message;
    }

    this.status = this.status_code;

    Object.setPrototypeOf(this, BaseError.prototype);

    // Maintains proper stack trace for thrown error (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseError);
    }
  }
}
