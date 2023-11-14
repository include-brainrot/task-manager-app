import { format } from "date-fns";
import path from "path";

import { SERVER_ERROR, SUCCESS, genId } from "@lib/utility";
import { api_config } from "@lib/config";

//***********************************************
//* log service
//***********************************************

const CLR = "\x1b[0m"; // clear
const LC = "\x1b[96m"; // Light Cyan
// const LM = "\x1b[95m"; // Light Magenta
const LY = "\x1b[93m"; // Light Yellow
const LE = "\x1b[92m"; // Light Green
const LR = "\x1b[91m"; // Light Red
const DG = "\x1b[90m"; // Dark Grey
// const LG = "\x1b[37m"; // Light Grey

export class LogService {
  constructor() {
    this.requestId = genId();
    this.requestHash = this.requestId.slice(0, 5);
    this.dir = path.join(api_config.data_dir, "logs");
    this.traceLog = [];
  }

  /* --------------------------------- Methods -------------------------------- */

  public startTrace(event: string) {
    this.traceLog.push(event);
    if (api_config.print_logs) {
      const time = `${DG}${format(new Date(), "hh:mm:ss")}${CLR}`;
      const tag = `${LC}<-${CLR} [${LY}${this.requestHash}${CLR}] ${time}`;
      // eslint-disable-next-line no-console
      console.error(`${tag} ${event}`);
    }
  }

  public endTrace(event: string, response = SUCCESS.OK) {
    this.stopClock();
    this.traceLog.push(event);
    if (api_config.print_logs && this.deltaTime) {
      const time = `${DG}${format(new Date(), "hh:mm:ss")}${CLR}`;
      const tag = `${LC}->${CLR} [${LY}${this.requestHash}${CLR}]${DG} ${time}`;
      const delta = this.deltaTime.getTime();

      // eslint-disable-next-line no-console
      console.error(`${tag} ${event} ${LE}${response.status}${CLR} ${delta}ms`);
    }
  }

  public pushEvent(event: string) {
    this.traceLog.push(event);
    if (api_config.print_logs) {
      const time = `${DG}${format(new Date(), "hh:mm:ss")}${CLR}`;
      const tag = `${LC}--${CLR} [${LY}${this.requestHash}${CLR}] ${time}`;

      // eslint-disable-next-line no-console
      console.error(`${tag} ${event}`);
    }
  }

  public pushError(event: string, response = SERVER_ERROR.INTERNAL) {
    this.stopClock();
    this.traceLog.push(event);
    if (api_config.print_logs && this.deltaTime) {
      const time = `${DG}${format(new Date(), "hh:mm:ss")}${CLR}`;
      // const tag = `${LR}->${CLR} [${LY}${this.requestHash}${CLR}] ${time}`;
      const tag = `${LR}->${CLR} [${LY}error${CLR}] ${time}`;
      const delta = this.deltaTime.getTime();

      // eslint-disable-next-line no-console
      console.error(`${tag} ${event} ${LR}${response.status}${CLR} ${delta}ms`);
    }
  }

  public stopClock() {
    this.stopTime = new Date();
    const delta = this.stopTime.getTime() - this.startTime.getTime();
    this.deltaTime = new Date(delta);
  }

  public commit() {
    // TODO: Implement 1 or more of the following:
    // TODO: Save stack to disk
    // TODO: Save to external service
    // TODO: Save to S3 instance
  }

  /* ------------------------------- Properties ------------------------------- */

  public readonly name: string = "log-service";

  public readonly requestId: string;
  public readonly requestHash: string;
  private readonly dir: string;
  private readonly traceLog: string[];

  private readonly startTime = new Date();
  private stopTime: Date | null = null;
  private deltaTime: Date | null = null;
}

export class GlobalLogService extends LogService {
  constructor() {
    super();
    this.requestHash = this.requestId;
  }

  /* --------------------------------- Methods -------------------------------- */

  /* ------------------------------- Properties ------------------------------- */

  public readonly name = "global-log-service";

  public readonly requestId: string = "event";
  public readonly requestHash: string;
}

export const logger = new GlobalLogService();
