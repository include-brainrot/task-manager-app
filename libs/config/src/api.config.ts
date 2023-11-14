import { IBaseConfig, base_config } from "./base.config";

const env = typeof window === "undefined" ? process.env : import.meta.env;

export type IAPIConfig = IBaseConfig & {
  /** general */
  allowed_hosts: string[];
  /** data */
  data_dir: string;
  /** security */
  salt_rounds: number;
  encryption_key: string;
  session_keys: string[];
  /** database (MySQL) */
  database_schema: string;
  mysql_string: string;
  mysql_root_string: string;
  db2_dsn: string;
  db2_user: string;
  db2_pass: string;
  /** s3 */
  s3: {
    access_key: string;
    secret_key: string;
  };
};

export const api_config: IAPIConfig = {
  ...base_config,
  /** general */
  allowed_hosts: env.ALLOWED_HOSTS?.split(",") ?? ["localhost"],
  /** data */
  data_dir: env.DATA_DIR ?? "data",
  /** security */
  salt_rounds: parseInt(env.SALT_ROUNDS ?? "12"),
  encryption_key: env.ENCRYPTION_KEY ?? "",
  session_keys: env.SESSION_KEYS?.split(",") ?? [
    "secret-key",
    "super-secret-key",
  ],
  /** database */
  database_schema: env.DATABASE_SCHEMA ?? "",
  /** database (MySQL) */
  mysql_string: env.MYSQL_STRING ?? "",
  mysql_root_string: env.MYSQL_ROOT_STRING ?? "",
  db2_dsn: env.DB2_DSN ?? "",
  db2_user: env.DB2_USER ?? "",
  db2_pass: env.DB2_PASS ?? "",
  /** s3 */
  s3: {
    ...base_config.s3,
    access_key: env.S3_ACCESS_KEY ?? "",
    secret_key: env.S3_SECRET_KEY ?? "",
  },
};
