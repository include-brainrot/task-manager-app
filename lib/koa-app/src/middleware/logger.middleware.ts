import KoaLogger from "koa-logger";
import type { Next } from "koa";

import type { AppContext, BaseMiddlewareConstructor } from "../types";

export const LoggerMiddleware: BaseMiddlewareConstructor = () => {
  const ExtendLogger = KoaLogger();

  return async (ctx: AppContext, next: Next) => {
    return await ExtendLogger(ctx, next);
  };
};
