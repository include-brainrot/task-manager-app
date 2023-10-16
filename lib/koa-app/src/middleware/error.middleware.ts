import type { Next } from "koa";

import { HTTP_RESPONSE_TYPE, SERVER_ERROR } from "@lib/utility";

import type { AppContext, BaseMiddlewareConstructor } from "../types";
import { BaseError, ClientError } from "@lib/logging";

type ErrorMiddlewareOptions = {
  print_errors: boolean;
  print_logs: boolean;
};

export const ErrorMiddleware: BaseMiddlewareConstructor<
  ErrorMiddlewareOptions
> = (options = {}) => {
  const { print_errors = false } = options;

  return async (ctx: AppContext, next: Next) => {
    try {
      return await next();
    } catch (err: unknown) {
      if (err instanceof BaseError || err instanceof ClientError) {
        ctx.status = err.status_code;
        ctx.body = err.message;
      } else {
        const error = err as HTTP_RESPONSE_TYPE;
        if (error.message) {
          ctx.status = error.status;
          ctx.body = error.message;
        } else {
          ctx.status = SERVER_ERROR.INTERNAL.status;
          ctx.body = SERVER_ERROR.INTERNAL.message;
        }
      }

      // eslint-disable-next-line no-console
      if (print_errors) console.log(err);
      if (typeof ctx.body === "string") ctx.set("Content-Type", "text/plain");
    }
  };
};
