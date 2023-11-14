import { BaseService } from ".";

import { ResolverContext } from "../../types";

//***********************************************
//* root service
//***********************************************

export class RootService implements BaseService {
  // FIXME - Add missing types
  constructor(context: ResolverContext<object> | null = null) {
    if (context) this.context = context;

    // this.logger = new LogService();

    // this.certificate = new CertificateService(this);
    // this.deal = new DealService(this);
    // this.session = new SessionService(this);
    // this.token = new TokenService(this);
  }

  /* --------------------------------- Methods -------------------------------- */

  /* ------------------------------- Properties ------------------------------- */

  public readonly name = "root-service";

  // FIXME - Add missing types
  public context!: ResolverContext<object>;

  // public logger: LogService;

  // public certificate: CertificateService;
  // public deal: DealService;
  // public session: SessionService;
  // public token: TokenService;
}
