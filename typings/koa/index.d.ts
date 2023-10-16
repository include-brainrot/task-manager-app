import type * as Koa from "koa";

declare module "koa" {
  export interface Request extends Koa.Request {
    params: Record<string, unknown>;
    body: Record<string, unknown> & string;
  }
}
