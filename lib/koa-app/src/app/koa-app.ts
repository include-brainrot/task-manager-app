import Koa from "koa";
import KoaRouter from "koa-router";

import { BaseError, ClientError, ServerError, logger } from "@lib/logging";
import { CLIENT_ERROR, SERVER_ERROR } from "@lib/utility";
import { ResolverContext, RootService, SessionContext } from "@lib/services";
import { OdbcError } from "odbc";

// const CLR = "\x1b[0m";
// const LC = "\x1b[96m"; // Light Cyan
// const LM = "\x1b[95m"; // Light Magenta

export type KoaAppOptions = {
  is_production: boolean;
  name: string;
  port: string | number;
  host: string;
};

export class KoaApp {
  public readonly base_server = new Koa();
  public readonly is_production: boolean = false;
  public readonly print_errors: boolean = true;
  public root_path = "";

  public readonly base_router: KoaRouter;

  public readonly name: string = "koa_app";
  public readonly port: string | number = 3000;
  public readonly host: string = "localhost";

  constructor(options: Partial<KoaAppOptions>) {
    if (options.name) this.name = options.name;
    if (options.port) this.port = options.port;
    if (options.host) this.host = options.host;
    if (require.main) this.root_path = require.main.path;

    this.base_router = new KoaRouter();
  }

  start() {
    this.base_server.use(async (ctx: ResolverContext<SessionContext>, next) => {
      ctx.state.rootService = new RootService(ctx);

      try {
        ctx.state.rootService.logger.startTrace(`${ctx.method}: ${ctx.path}`);
        await next();

        // NOTE: Throw 404 exception if response body is not set
        if (!ctx.body) {
          throw new ClientError({
            message: CLIENT_ERROR.NOT_FOUND.message,
            status_code: CLIENT_ERROR.NOT_FOUND.status,
          });
        }

        ctx.state.rootService.logger.endTrace(`${ctx.method}: ${ctx.path}`);
      } catch (err: unknown) {
        // NOTE: Log exception and bubble to error handler
        if (err instanceof BaseError) {
          ctx.state.rootService.logger.pushError(`${ctx.method}: ${ctx.path}`, {
            message: err.message,
            status: err.status_code,
          });
        } else if ((err as { odbcErrors: OdbcError[] }).odbcErrors) {
          const errors = (err as { odbcErrors: OdbcError[] }).odbcErrors;
          if (!errors.length) {
            throw new ServerError({
              message: SERVER_ERROR.INTERNAL.message,
              status_code: SERVER_ERROR.INTERNAL.status,
              internal_message: errors,
            });
          }

          ctx.state.rootService.logger.pushError(`${ctx.method}: ${ctx.path}`, {
            message: errors[0].message,
            // status: errors[0].code,
            status: SERVER_ERROR.INTERNAL.status,
          });
        }

        throw err;
      }
    });

    this.base_server.use(this.base_router.routes());

    this.base_server.use(async (ctx, next) => {
      await next();

      // NOTE: Check that request URL exists
      if (ctx.router.matched) return;

      throw new ServerError({
        message: SERVER_ERROR.NOT_IMPLEMENTED.message,
        status_code: SERVER_ERROR.NOT_IMPLEMENTED.status,
      });
    });

    this.base_server.listen(this.port, () => {
      const dev_url = `http://${this.host}:${this.port}`;
      const prod_url = `https://${this.host}`;
      // // eslint-disable-next-line no-console
      // console.log(`[${LC}env${CLR}]: ${this.base_server.env}`);
      // // eslint-disable-next-line no-console
      // console.log(`[${LC}hostname${CLR}]: ${this.host}`);
      // // eslint-disable-next-line no-console
      // console.log(`[${LC}port${CLR}]: ${this.port}`);
      // // eslint-disable-next-line no-console
      // console.log(
      //   `[${LC}listening${CLR}]: ${this.is_production ? prod_url : dev_url}\n`,
      // );
      logger.pushEvent(
        `listening ${this.is_production ? prod_url : dev_url}\n`,
      );
    });
  }
}
