"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @internal
class LokiSettings {
    constructor() {
        this.filename = "aurelia-lokijs.db";
        this.useIndexedDbIfAvailable = true;
        this.autoload = true;
        this.autosave = true;
        this.autosaveInterval = 2500;
        this.env = "BROWSER";
    }
}
exports.LokiSettings = LokiSettings;
