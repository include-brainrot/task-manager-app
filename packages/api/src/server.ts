import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

import { KoaService } from "@lib/koa-service";
import { api_config } from "@lib/config";
import { logger } from "@lib/log-service";

const envConfig = dotenv.config({
  path: "../../.env",
  override: true,
});

dotenvExpand.expand(envConfig);

const service = new KoaService({
  is_production: api_config.env === "production",
  name: api_config.appname,
  port: api_config.api_port,
  hostname: api_config.host,
});

(async () => {
  /*************************************
   * Logger Service
   *************************************/

  logger.startTrace("");
  logger.pushEvent(`${api_config.env} environment`);

  /*************************************
   * Database
   *************************************/

  /*************************************
   * Middleware
   *************************************/

  // Koa.base_server.use(
  //   ErrorMiddleware({
  //     print_errors: api_config.print_errors,
  //     print_logs: api_config.print_logs,
  //   }),
  // );

  // app.base_server.use(LoggerMiddleware());

  // app.base_server.use(JsonMiddleware());

  // app.base_server.use(
  //   CorsMiddleware({
  //     // origin: api_config.allowed_hosts,
  //     origin: "*",
  //   }),
  // );

  // app.base_server.use(
  //   KoaBody({
  //     formidable: {
  //       maxFileSize: api_config.max_bytes,
  //       uploadDir: api_config.data_dir,
  //       multiples: true,
  //     },
  //     multipart: true,
  //     urlencoded: true,
  //   }),
  // );

  // configure_routes(app).then(() => {
  //   app.start();
  // });

  service.start();
})();
