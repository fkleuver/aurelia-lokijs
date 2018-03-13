"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const lokijs_1 = __importDefault(require("lokijs"));
const loki_indexed_adapter_1 = require("./adapters/loki-indexed-adapter");
class LokiProvider {
    constructor(settings) {
        this.settings = settings;
        if (!settings.adapter) {
            if (settings.useIndexedDbIfAvailable && loki_indexed_adapter_1.LokiIndexedAdapter.checkAvailability()) {
                this.persistenceAdapter = new loki_indexed_adapter_1.LokiIndexedAdapter("default");
            }
            else {
                this.persistenceAdapter = new lokijs_1.default.LokiLocalStorageAdapter();
            }
        }
        else {
            this.persistenceAdapter = settings.adapter;
        }
        this.db = new lokijs_1.default(settings.filename, settings);
    }
    getOrAddCollection(name, options) {
        let collection = this.db.getCollection(name);
        if (collection === null) {
            collection = this.db.addCollection(name, Object.assign({ disableChangesApi: false }, options));
        }
        const setId = this.settings.setEntityId;
        if (setId) {
            const prop = /String/.test(Object.prototype.toString.call(setId)) ? setId : "id";
            const setEntityId = (obj) => {
                obj[prop] = obj[prop] || obj.$loki;
            };
            if (collection.events.insert.every((cb) => cb.name !== "setEntityId")) {
                collection.on("insert", setEntityId);
            }
        }
        return collection;
    }
}
exports.LokiProvider = LokiProvider;
