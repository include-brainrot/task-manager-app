//***********************************************
//* session service
//***********************************************

import { BaseService, RootService } from "../core";

export class SessionService implements BaseService {
  private readonly rootService!: RootService;

  constructor(rootService?: RootService) {
    if (rootService) this.rootService = rootService;
  }

  /* --------------------------------- Methods -------------------------------- */

  public async createSession() {
    return {
      user_id: 0,
    };
  }

  public async getSession() {
    return {
      user_id: 0,
    };
  }

  public async deleteSession() {
    return {
      user_id: 0,
    };
  }

  /* ------------------------------- Properties ------------------------------- */

  public readonly name = "session-service";

  readonly MAX_SESSION_LENGTH = 30;
  readonly MAX_SESSION_LENGTH_MS =
    1000 * 60 * 60 * 24 * this.MAX_SESSION_LENGTH;
}
