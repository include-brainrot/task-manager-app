import { RootService } from "@lib/services";

export declare global {
  export declare module globalThis {
    // eslint-disable-next-line no-var
    export var rootService: RootService;
  }

  // eslint-disable-next-line no-var
  var rootService: RootService;
}
