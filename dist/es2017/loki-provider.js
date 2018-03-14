import lokijs from "lokijs";
import { LokiIndexedDbAdapter } from "./adapters/loki-indexed-db-adapter";
export class LokiProvider {
    constructor(settings) {
        this.setEntityId = (obj) => {
            if (obj[this.entityIdProperty] === undefined) {
                obj[this.entityIdProperty] = obj.$loki;
            }
        };
        if (!settings.adapter) {
            if (settings.useIndexedDbIfAvailable && LokiIndexedDbAdapter.checkAvailability()) {
                this.persistenceAdapter = new LokiIndexedDbAdapter("default");
            }
            else {
                this.persistenceAdapter = new lokijs.LokiLocalStorageAdapter();
            }
        }
        else {
            this.persistenceAdapter = settings.adapter;
        }
        this.db = new lokijs(settings.filename, settings);
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
