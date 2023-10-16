//***********************************************
//* root service
//***********************************************

import { LogService } from "@lib/logging";

import type { BaseService } from "./base.service";
import type { ResolverContext } from "../../types";
import { SessionContext } from "../../guard";
import { SessionService } from "../local";

export class RootService implements BaseService {
  constructor(context: ResolverContext<SessionContext> | null = null) {
    if (context) this.context = context;

    this.logger = new LogService();

    this.session = new SessionService(this);
  }

  /* --------------------------------- Methods -------------------------------- */

  /* ------------------------------- Properties ------------------------------- */

  public readonly name = "root-service";

  public context!: ResolverContext<SessionContext>;

  public logger: LogService;

  public session: SessionService;
}
