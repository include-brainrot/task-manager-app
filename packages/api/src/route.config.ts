import KoaRouter from "koa-router";
import fs from "fs";

import { KoaApp } from "@lib/koa-app";
import { api_config } from "@lib/config";
import { logger } from "@lib/logging";

const CLR = "\x1b[0m"; // Clear
const LG = "\x1b[92m"; // Light Green
const LR = "\x1b[91m"; // Light Red
// const CN = "\x1b[36m"; // Cyan

export const versions = fs.readdirSync(`${__dirname}/controller`);
const controller_regex = /[.]?(controller\.ts|controller\.js)$/;

type Controller = { route: string; router: KoaRouter };
const controller_dir = `${__dirname}/controller`;

const import_route = async (path: string) => {
  try {
    return (await import(path)) as Controller;
  } catch (e) {
    return null;
  }
};

const load_routes = async (route: string) => {
  const version = route.replace(`${controller_dir}/`, "");
  const sub_router = new KoaRouter({ prefix: `/${version}` });
  const controllers = fs
    .readdirSync(route)
    .filter((x) => x.match(controller_regex));
  for (const controller of controllers) {
    const c_module = await import_route(`${route}/${controller}`).catch((x) =>
      // eslint-disable-next-line no-console
      console.log(x),
    );
    const filename = controller
      .replace(controller_dir, "")
      .replace(controller_regex, "");

    if (c_module) {
      sub_router.use(c_module.route, c_module.router.routes());
      if (api_config.print_errors) {
        logger.pushEvent(`(${LG}controller${CLR}) /api/${version}/${filename}`);
      }
    } else {
      if (api_config.print_errors) {
        logger.pushEvent(`(${LR}controller${CLR}) /api/${version}/${filename}`);
      }
    }
  }
  return sub_router;
};

export const configure_routes = async (app: KoaApp) => {
  const routes = fs.readdirSync(controller_dir);
  const base_router = new KoaRouter({ prefix: "/api" });
  for (const route of routes) {
    const router = await load_routes(`${controller_dir}/${route}`);
    base_router.use(router.routes());
  }
  app.base_router.use(base_router.routes());
};
