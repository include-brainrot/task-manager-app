import { Next, ParameterizedContext } from "koa";
import { IMiddleware } from "koa-router";

import yup, { ObjectSchema } from "yup";

import { CLIENT_ERROR } from "@lib/utility";
import { validateSchema } from "@lib/shared/helpers";

export type PathContext<T = { [key: string]: unknown }> = {
  path: T;
};

export const PathResolver = <T = unknown>(
  schema: ObjectSchema<yup.AnyObject>,
): IMiddleware<PathContext<T>> => {
  return async (ctx: ParameterizedContext<PathContext<T>>, next: Next) => {
    const { value, error } = validateSchema<T>(schema, ctx.request.params, {
      stripUnknown: true,
      abortEarly: false,
    });

    if (error || !value) {
      ctx.status = CLIENT_ERROR.BAD_REQUEST.status;
      ctx.body = error || CLIENT_ERROR.BAD_REQUEST.message;
      return;
    }

    ctx.state = {
      ...ctx.state,
      path: value,
    };

    (ctx.request as unknown as { body: T | null }).body = value;

    await next();
  };
};
