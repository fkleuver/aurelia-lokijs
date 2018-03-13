import lokijs from "lokijs";
import { LokiIndexedAdapter } from "./adapters/loki-indexed-adapter";
export class LokiProvider {
    constructor(settings) {
        this.settings = settings;
        if (!settings.adapter) {
            if (settings.useIndexedDbIfAvailable && LokiIndexedAdapter.checkAvailability()) {
                this.persistenceAdapter = new LokiIndexedAdapter("default");
            }
            else {
                this.persistenceAdapter = new lokijs.LokiLocalStorageAdapter();
            }
        }
        else {
            this.persistenceAdapter = settings.adapter;
        }
        this.db = new lokijs(settings.filename, settings);
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
