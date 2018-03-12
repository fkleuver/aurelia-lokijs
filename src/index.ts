import { FrameworkConfiguration } from "aurelia-framework";
import { LokiProvider } from "./loki-provider";
import { ILokiSettings, LokiSettings } from "./loki-settings";

export function configure(fxconfig: FrameworkConfiguration, configureSettings: (settings: ILokiSettings) => void): void {
  const settings: ILokiSettings = new LokiSettings();
  if (typeof configureSettings === "function") {
    configureSettings(settings);
  }
  const provider = new LokiProvider(settings);
  fxconfig.instance(LokiProvider, provider);
}
