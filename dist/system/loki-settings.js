System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var LokiSettings;
    return {
        setters: [],
        execute: function () {
            LokiSettings = class LokiSettings {
                constructor() {
                    this.filename = "aurelia-lokijs.db";
                    this.useIndexedDbIfAvailable = true;
                    this.autoload = true;
                    this.autosave = true;
                    this.autosaveInterval = 2500;
                    this.env = "BROWSER";
                }
            };
            exports_1("LokiSettings", LokiSettings);
        }
    };
});
