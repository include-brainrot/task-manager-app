// import { Db2FileEnum } from "@lib/shared";

import { IBaseConfig, base_config } from "./base.config";

const env = typeof window === "undefined" ? process.env : import.meta.env;

export type IDBConfig = IBaseConfig & {
  /** data */
  data_dir: string;
  /** database (MySQL) */
  database_schema: string;
  mysql_string: string;
  mysql_root_string: string;
  db2_dsn: string;
  db2_user: string;
  db2_pass: string;
  db2_string: string;
  /** database aliases */
  db2_alias: {
    // [x in Lowercase<Db2FileEnum>]: string;
  };
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
  db2_dsn: env.DB2_DSN ?? "",
  db2_user: env.DB2_USER ?? "",
  db2_pass: env.DB2_PASS ?? "",
  db2_string: env.DB2_STRING ?? "",
  /** database aliases */
  db2_alias: {
    chemical: env.DB2_SCHEMA_CHEMICAL ?? "",
    fi_log: env.DB2_SCHEMA_FI_LOG ?? "",
    insurance: env.DB2_SCHEMA_INSURANCE ?? "",
    market_analysis: env.DB2_SCHEMA_MARKET_ANALYSIS ?? "",
    replacement_insurance: env.DB2_SCHEMA_REPLACEMENT_INSURANCE ?? "",
    stored_procedure: env.DB2_SCHEMA_STORED_PROCEDURE ?? "",
    warranty: env.DB2_SCHEMA_WARRANTY ?? "",
  },
};
