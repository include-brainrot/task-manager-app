import { load_env } from "./load_env";

load_env("../../.env");
if (!(process.env.NODE_ENV === "development")) {
  load_env(`../../.env.${process.env.NODE_ENV}`);
}

const env_vars = typeof window === "undefined" ? process.env : import.meta.env;

export type IConfigEnvironment =
  | "development"
  | "production"
  | "staging"
  | "test";

export type IBaseConfig = {
  /** general */
  env: IConfigEnvironment;
  print_errors: boolean;
  print_logs: boolean;
  appname: string;
  app_title: string;
  app_email: string;
  app_description: string;
  host: string;
  /** api config */
  api_port: number;
  api_host: string;
  api_version: string;
  /** web config */
  web_port: number;
  web_host: string;
  /** legacy api config */
  legacy_api_host: string;
  /** data */
  data_dir: string;
  max_bytes: number;
  /** s3 */
  s3: {
    endpoint: string;
    bucket: string;
    region: string;
  };
};

export const base_config: IBaseConfig = {
  /** general */
  env: (env_vars.ENV as IConfigEnvironment) ?? "development",
  print_errors: env_vars.PRINT_ERRORS === "true",
  print_logs: env_vars.PRINT_LOGS === "true",
  appname: env_vars.APPNAME ?? "app_title",
  app_title: env_vars.APP_TITLE ?? "app_title",
  app_email: env_vars.APP_EMAIL ?? "app@example.com",
  app_description: env_vars.APP_DESCRIPTION ?? "app_description",
  host: env_vars.HOST ?? "localhost",
  /** api config */
  api_port: parseInt(env_vars.API_PORT ?? "3000"),
  api_host: env_vars.API_HOST ?? "localhost",
  api_version: env_vars.API_VERSION ?? "v1",
  /** web config */
  web_port: parseInt(env_vars.WEB_PORT ?? "3010"),
  web_host: env_vars.WEB_HOST ?? "localhost",
  /** legacy api config */
  legacy_api_host: env_vars.LEGACY_API_HOST ?? "localhost",
  /** data */
  data_dir: env_vars.DATA_DIR ?? "data",
  max_bytes: Number(env_vars.MAX_BYTES ?? "0") || (2 << 19) * 200,
  /** s3 */
  s3: {
    endpoint: env_vars.S3_ENDPOINT ?? "http://localhost:9000",
    bucket: env_vars.S3_BUCKET ?? "bucket",
    region: env_vars.S3_REGION ?? "us-west-1",
  },
};
