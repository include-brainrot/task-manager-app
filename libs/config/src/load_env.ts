import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

export const load_env = (path: string) => {
  const envConfig = dotenv.config({
    path,
    override: true,
  });

  dotenvExpand.expand(envConfig);

  return !envConfig.error;
};
