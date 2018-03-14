var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
define(["require", "exports", "lokijs", "./adapters/loki-indexed-db-adapter"], function (require, exports, lokijs_1, loki_indexed_db_adapter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    lokijs_1 = __importDefault(lokijs_1);
    class LokiProvider {
        constructor(settings) {
            this.setEntityId = (obj) => {
                if (obj[this.entityIdProperty] === undefined) {
                    obj[this.entityIdProperty] = obj.$loki;
                }
            };
            if (!settings.adapter) {
                if (settings.useIndexedDbIfAvailable && loki_indexed_db_adapter_1.LokiIndexedDbAdapter.checkAvailability()) {
                    this.persistenceAdapter = new loki_indexed_db_adapter_1.LokiIndexedDbAdapter("default");
                }
                else {
                    this.persistenceAdapter = new lokijs_1.default.LokiLocalStorageAdapter();
                }
            }
            else {
                this.persistenceAdapter = settings.adapter;
            }
            this.db = new lokijs_1.default(settings.filename, settings);
            this.settings = settings;
            const setId = settings.setEntityId;
            this.entityIdProperty = /String/.test(Object.prototype.toString.call(setId)) ? setId : "id";
            this.setEntityIdAppliedKey = Symbol("setEntityId");
        }
        getOrAddCollection(name, options) {
            let collection = this.db.getCollection(name);
            if (collection === null) {
                collection = this.db.addCollection(name, Object.assign({ disableChangesApi: false }, options));
            }
            if (this.settings.setEntityId) {
                this.applySetEntityId(collection);
            }
            return collection;
        }
        applySetEntityId(collection) {
            if (!Object.prototype.hasOwnProperty.call(collection, this.setEntityIdAppliedKey)) {
                Object.defineProperty(collection, this.setEntityIdAppliedKey, {
                    enumerable: false,
                    configurable: false,
                    writable: false
                });
                collection.on("insert", this.setEntityId);
            }
        }
    }
    exports.LokiProvider = LokiProvider;
});
