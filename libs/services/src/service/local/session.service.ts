import { BaseService, RootService } from "../core";

//***********************************************
//* session service
//***********************************************

export class SessionService implements BaseService {
  private readonly rootService!: RootService;

  constructor(rootService?: RootService) {
    if (rootService) this.rootService = rootService;
  }

  /* --------------------------------- Methods -------------------------------- */

  /* ------------------------------- Properties ------------------------------- */

  public readonly name = "session-service";

  readonly MAX_SESSION_LENGTH = 30;
  readonly MAX_SESSION_LENGTH_MS =
    1000 * 60 * 60 * 24 * this.MAX_SESSION_LENGTH;
}
