"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const loki_provider_1 = require("./loki-provider");
const loki_settings_1 = require("./loki-settings");
function configure(fxconfig, configureSettings) {
    const settings = new loki_settings_1.LokiSettings();
    if (typeof configureSettings === "function") {
        configureSettings(settings);
    }
    const provider = new loki_provider_1.LokiProvider(settings);
    fxconfig.instance(loki_provider_1.LokiProvider, provider);
}
exports.configure = configure;
__export(require("./adapters/loki-indexed-adapter"));
__export(require("./loki-provider"));
__export(require("./loki-settings"));
