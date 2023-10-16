import { Next } from "koa";

import { CLIENT_ERROR } from "@lib/utility";
import { ClientError } from "@lib/logging";
import { User } from "@lib/shared";

import { ResolverContext } from "../types";

export type SessionContext = { user: User };

/* -------------------------------------------------------------------------- */
/*                             Session Guard                             */
/* -------------------------------------------------------------------------- */

export const SessionGuard = () => {
  // TODO - Validate Session Token
  return async (ctx: ResolverContext<SessionContext>, _next: Next) => {
    // const { session: sessionService, logger } = ctx.state.rootService;
    const authorization = ctx.headers.authorization;

    if (!authorization || !authorization.length) {
      throw new ClientError({
        message: CLIENT_ERROR.UNAUTHORIZED.message,
        status_code: CLIENT_ERROR.UNAUTHORIZED.status,
        internal_message: "[Session] Key not provided.",
      });
    }

    const [authorization_type, authorization_key] = authorization.split(" ");

    if (!authorization_key) {
      throw new ClientError({
        message: CLIENT_ERROR.UNAUTHORIZED.message,
        status_code: CLIENT_ERROR.UNAUTHORIZED.status,
        internal_message: "[Session] Key not formatted properly.",
      });
    }

    if (authorization_type === "Basic") {
      // TODO - Validate Session Token
      // logger.pushEvent(`[Session] Authorized Session`);
    }

    throw new ClientError({
      message: CLIENT_ERROR.UNAUTHORIZED.message,
      status_code: CLIENT_ERROR.UNAUTHORIZED.status,
      internal_message: "[Session] Could not verify authorization key.",
    });
  };
};
