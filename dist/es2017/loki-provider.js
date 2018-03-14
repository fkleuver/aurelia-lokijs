import lokijs from "lokijs";
import { LokiIndexedDbAdapter } from "./adapters/loki-indexed-db-adapter";
/**
 * Wrapper class that instantiates the loki db & adapter, and manages collections
 */
export class LokiProvider {
    constructor(settings) {
        this.setEntityId = (obj) => {
            if (!/Number/.test(Object.prototype.toString.call(obj[this.entityIdProperty]))) {
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
    /**
     * Gets the collection with the specified name
     *
     * Creates a new one if it does not exist, otherwise returns the existing one
     */
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
