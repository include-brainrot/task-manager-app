import Koa from "koa";
import KoaRouter from "koa-router";
import { OdbcError } from "odbc";

import { ResolverContext, RootService } from "@lib/services";
import { logger } from "@lib/log-service";

export type KoaServiceOptions = {
  is_production: boolean;
  name: string;
  port: number;
  hostname: string;
};

export class KoaService {
  public readonly base_server = new Koa();
  public readonly is_production: boolean = false;
  public readonly print_errors: boolean = true;
  public root_path = "";

  public readonly base_router: KoaRouter;

  public readonly name: string = "koa_app";
  public readonly port: number = 3000;
  public readonly hostname: string = "localhost";
  public readonly url: string = "localhost";

  constructor(options: Partial<KoaServiceOptions>) {
    this.is_production = !!options.is_production;
    if (options.name) this.name = options.name;
    if (options.port) this.port = options.port;
    if (options.hostname) this.hostname = options.hostname;
    if (require.main) this.root_path = require.main.path;

    if (options.is_production) {
      this.url = `https://${this.hostname}`;
    } else {
      this.url = `http://${this.hostname}:${this.port}`;
    }

    this.base_router = new KoaRouter();
  }

  public async start() {
    start_service(this);

    this.base_server.listen(this.port, this.hostname, () => {
      logger.pushEvent(`listening ${this.url}\n`);
    });
  }
}

const start_service = async (service: KoaService) => {
  service.base_server.use(
    // FIXME - Add missing types
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (ctx: ResolverContext<object>, next) => {
      ctx.state.rootService = new RootService(ctx);
    },
  );
};
