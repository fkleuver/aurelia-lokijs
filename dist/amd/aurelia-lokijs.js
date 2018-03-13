define(["require", "exports", "./loki-provider", "./loki-settings"], function (require, exports, loki_provider_1, loki_settings_1) {
    "use strict";
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
});
