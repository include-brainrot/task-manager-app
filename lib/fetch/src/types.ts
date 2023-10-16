export type FetchProtocol = "http" | "https";

export type FetchMethod =
  | "delete"
  | "get"
  | "patch"
  | "post"
  | "put"
  | "search";

export type FetchSuccessCodes = 200 | 201 | 204;

export type FetchClientCode = 400 | 401 | 404;

export type FetchServerCodes = 500;

export type FetchStatusCode =
  | FetchSuccessCodes
  | FetchClientCode
  | FetchServerCodes;

export type FetchPayload = {
  [x: number | string]: FetchPayload | number | string;
};

export type GetParams = {
  parameters?: FetchPayload;
  headers?: { [key: string]: number | string };
};

export type PostParams<T = FetchPayload> = GetParams & {
  body?: FetchPayload | T | string;
  formData?: FetchPayload;
};

export type FetchParams<T = FetchPayload> = PostParams<T> & {
  method?: FetchMethod;
};

export type FetchClient = ReturnType<
  (options: FetchParams<FetchPayload>) => Promise<Response>
>;

export type FetchResponse<T> = Promise<Response & { json: Promise<T> }>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FetchResponseData<T = { [x: string]: any }> = { [x: string]: T };

export type FetchConfig = {
  protocol?: FetchProtocol;

  hostname: string;
  port?: number;
  base_path?: string;

  api_token?: string | null;
  api_token_type?: string;
  api_version?: string;
};
