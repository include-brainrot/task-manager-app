import KoaCORS from "@koa/cors";
import type { Next } from "koa";

import type { AppContext, BaseMiddlewareConstructor } from "../types";

type CorsMiddlewareOptions = {
  origin: string | string[];
  credentials: boolean;
  keepHeadersOnError: boolean;
};

export const CorsMiddleware: BaseMiddlewareConstructor<
  CorsMiddlewareOptions
> = (options = { credentials: true }) => {
  const { origin = "" } = options;
  const origin_list = typeof origin === "string" ? [origin] : origin;

  const originResolver = (ctx: AppContext) => {
    return origin_list.find((value) => value === ctx.origin) || "";
  };

  const ExtendCors = KoaCORS({ ...options, origin: originResolver });

  return async (ctx: AppContext, next: Next) => {
    return await ExtendCors(ctx, next);
  };
};
