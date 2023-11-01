import KoaBody from "koa-body";

import {
  CorsMiddleware,
  ErrorMiddleware,
  JsonMiddleware,
  KoaApp,
} from "@lib/koa-app";
import { api_config } from "@lib/config";
import { logger } from "@lib/logging";

import { configure_routes } from "./route.config";

/*************************************
 * Configuration
 *************************************/

const app = new KoaApp({
  is_production: api_config.env === "production",
  name: api_config.appname,
  port: api_config.api_port,
  host: api_config.host,
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

  app.base_server.use( 
    ErrorMiddleware({
      print_errors: api_config.print_errors,
      print_logs: api_config.print_logs,
    }),
  );

  // app.base_server.use(LoggerMiddleware());

  app.base_server.use(JsonMiddleware());

  app.base_server.use(
    CorsMiddleware({
      // origin: api_config.allowed_hosts,
      origin: "*",
    }),
  );

  app.base_server.use(
    KoaBody({
      formidable: {
        maxFileSize: api_config.max_bytes,
        uploadDir: api_config.data_dir,
        multiples: true,
      },
      multipart: true,
      urlencoded: true,
    }),
  );

  configure_routes(app).then(() => {
    app.start();
  });
})();
