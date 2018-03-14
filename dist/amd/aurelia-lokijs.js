define(["require", "exports", "./loki-provider", "./loki-settings", "./adapters/loki-indexed-db-adapter", "./loki-provider", "./loki-settings"], function (require, exports, loki_provider_1, loki_settings_1, loki_indexed_db_adapter_1, loki_provider_2, loki_settings_2) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(fxconfig, configureSettings) {
        const settings = new loki_settings_1.LokiSettings();
        if (typeof configureSettings === "function") {
            configureSettings(settings);
        }
        const provider = new loki_provider_1.LokiProvider(settings);
        fxconfig.instance(loki_provider_1.LokiProvider, provider);
    }
    exports.configure = configure;
    __export(loki_indexed_db_adapter_1);
    __export(loki_provider_2);
    __export(loki_settings_2);
});
