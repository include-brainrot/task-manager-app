import type { DefaultContext, DefaultState, ParameterizedContext } from "koa";

import { RootService } from "./service/core";

export type ResolverContextState = DefaultState & {
  [key: string]: unknown;
  rootService: RootService;
};

export type ResolverContext<
  StateT extends object = ResolverContextState,
  ContextT extends DefaultContext = DefaultContext,
  ResponseBodyT = unknown,
> = ParameterizedContext<StateT, ContextT, ResponseBodyT> & {
  state: ResolverContextState;
};
