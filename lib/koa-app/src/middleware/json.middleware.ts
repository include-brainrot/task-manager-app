import KoaJSON from "koa-json";
import type { Next } from "koa";

import type { AppContext, BaseMiddlewareConstructor } from "../types";

type JsonMiddlewareOptions = {
  pretty: boolean;
  param: string;
  spaces: number;
};

export const JsonMiddleware: BaseMiddlewareConstructor<
  JsonMiddlewareOptions
> = (options = {}) => {
  const { pretty = true, param } = options;

  const ExtendJson = KoaJSON({ ...options, pretty, param });

  return async (ctx: AppContext, next: Next) => {
    return ExtendJson(ctx, next);
  };
};
