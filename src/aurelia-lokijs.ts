import { FrameworkConfiguration } from "aurelia-framework";
import { LokiProvider } from "./loki-provider";
import { ILokiSettings, LokiSettings } from "./loki-settings";

export function configure(fxconfig: FrameworkConfiguration, configureSettings?: (settings: ILokiSettings) => void): void {
  const settings: ILokiSettings = new LokiSettings();
  if (typeof configureSettings === "function") {
    configureSettings(settings);
  }
  const provider = new LokiProvider(settings).makeGlobal();
  fxconfig.instance(LokiProvider, provider);
}

export * from "./adapters/loki-indexed-db-adapter";
export * from "./loki-provider";
export * from "./loki-settings";
export * from "./decorators";
export * from "./resolvers";
