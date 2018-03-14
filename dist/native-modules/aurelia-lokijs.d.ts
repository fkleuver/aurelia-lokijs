import { FrameworkConfiguration } from "aurelia-framework";
import { ILokiSettings } from "./loki-settings";
export declare function configure(fxconfig: FrameworkConfiguration, configureSettings?: (settings: ILokiSettings) => void): void;
export * from "./adapters/loki-indexed-db-adapter";
export * from "./loki-provider";
export * from "./loki-settings";
