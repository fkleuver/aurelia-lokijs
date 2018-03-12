import lokijs from "lokijs";
import { LokiIndexedAdapter } from "./adapters/loki-indexed-adapter";
export class LokiProvider {
    constructor(settings) {
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
    getOrAddCollection(name) {
        let collection = this.db.getCollection(name);
        if (collection === null) {
            collection = this.db.addCollection(name, { disableChangesApi: false });
        }
        return collection;
    }
}
