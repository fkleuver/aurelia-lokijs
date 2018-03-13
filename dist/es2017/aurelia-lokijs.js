import { LokiProvider } from "./loki-provider";
import { LokiSettings } from "./loki-settings";
export function configure(fxconfig, configureSettings) {
    const settings = new LokiSettings();
    if (typeof configureSettings === "function") {
        configureSettings(settings);
    }
    const provider = new LokiProvider(settings);
    fxconfig.instance(LokiProvider, provider);
}
export * from "./adapters/loki-indexed-adapter";
export * from "./loki-provider";
export * from "./loki-settings";
