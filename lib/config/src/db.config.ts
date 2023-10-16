import { IBaseConfig, base_config } from "./base.config";

const env = typeof window === "undefined" ? process.env : import.meta.env;

export type IDBConfig = IBaseConfig & {
  /** data */
  data_dir: string;
  /** database (MySQL) */
  database_schema: string;
  mysql_string: string;
  mysql_root_string: string;
};

export const db_config: IDBConfig = {
  ...base_config,
  /** data */
  data_dir: env.DATA_DIR ?? "data",
  /** database */
  database_schema: env.DATABASE_SCHEMA ?? "",
  /** database (MySQL) */
  mysql_string: env.MYSQL_STRING ?? "",
  mysql_root_string: env.MYSQL_ROOT_STRING ?? "",
};
