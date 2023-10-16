import { Next, ParameterizedContext } from "koa";
import { IMiddleware } from "koa-router";

import yup, { ObjectSchema } from "yup";

import { CLIENT_ERROR } from "@lib/utility";
import { validateSchema } from "@lib/shared/helpers";

export type HeaderContext<T = { [key: string]: unknown }> = {
  headers: T;
};

export const HeaderResolver = <T = unknown>(
  schema: ObjectSchema<yup.AnyObject>,
): IMiddleware<HeaderContext<T>> => {
  return async (ctx: ParameterizedContext<HeaderContext<T>>, next: Next) => {
    const { value, error } = validateSchema<T>(schema, ctx.request.headers, {
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
      headers: value,
    };

    await next();
  };
};
