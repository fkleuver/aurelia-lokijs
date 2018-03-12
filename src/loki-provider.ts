import lokijs from "lokijs";
import { LokiIndexedAdapter } from "./adapters/loki-indexed-adapter";
import { ILokiSettings } from "./loki-settings";

export class LokiProvider {
  public persistenceAdapter: LokiPersistenceAdapter;
  public db: Loki;

  constructor(settings: ILokiSettings) {
    if (!settings.adapter) {
      if (settings.useIndexedDbIfAvailable && LokiIndexedAdapter.checkAvailability()) {
        this.persistenceAdapter = new LokiIndexedAdapter("default");
      } else {
        this.persistenceAdapter = new lokijs.LokiLocalStorageAdapter();
      }
    } else {
      this.persistenceAdapter = settings.adapter;
    }
    this.db = new lokijs(settings.filename, settings);
  }

  public getOrAddCollection<T extends Object>(name: string): Collection<T> {
    let collection = this.db.getCollection<T>(name);
    if (collection === null) {
      collection = this.db.addCollection<T>(name, { disableChangesApi: false });
    }

    return collection;
  }
}
