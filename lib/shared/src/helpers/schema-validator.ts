import type { AnyObject, ObjectSchema, ValidateOptions } from "yup";
import { ValidationError } from "yup";

export type ValidateSchemaSuccess<T = unknown> = {
  value: T;
  error: null;
};
export type ValidateSchemaErrorMessage = {
  path: string;
  message: string;
};

export type ValidateSchemaError = {
  value: null;
  error: ValidateSchemaErrorMessage[];
};

export const validateSchema = <T = unknown>(
  schema: ObjectSchema<AnyObject>,
  data: Record<string, unknown>,
  options: ValidateOptions = {},
) => {
  let value: { [x: string]: unknown; [x: number]: unknown } | null = null;
  try {
    value = schema.validateSync(data, {
      abortEarly: false,
      ...options,
    });
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      return {
        value: null,
        error: error.inner.map((e) => ({
          path: e.path ?? "",
          message: e.message.replace(/"/g, ""),
        })),
      } as ValidateSchemaError;
    }
  }

  return {
    value,
    error: null,
  } as ValidateSchemaSuccess<T>;
};
