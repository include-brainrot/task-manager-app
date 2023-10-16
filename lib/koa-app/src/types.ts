import type { Next, ParameterizedContext } from "koa";

export type AppContext = ParameterizedContext;

export type BaseMiddleware = (ctx: AppContext, next: Next) => Promise<unknown>;

export type BaseMiddlewareConstructor<T = Record<string, unknown>> = (
  options?: Partial<T>,
) => BaseMiddleware;
