System.register(["./loki-provider", "./loki-settings"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(fxconfig, configureSettings) {
        const settings = new loki_settings_1.LokiSettings();
        if (typeof configureSettings === "function") {
            configureSettings(settings);
        }
        const provider = new loki_provider_1.LokiProvider(settings);
        fxconfig.instance(loki_provider_1.LokiProvider, provider);
    }
    exports_1("configure", configure);
    var loki_provider_1, loki_settings_1;
    return {
        setters: [
            function (loki_provider_1_1) {
                loki_provider_1 = loki_provider_1_1;
            },
            function (loki_settings_1_1) {
                loki_settings_1 = loki_settings_1_1;
            }
        ],
        execute: function () {
        }
    };
});
