import lokijs from "lokijs";
import { LokiIndexedAdapter } from "./adapters/loki-indexed-adapter";
import { ILokiSettings } from "./loki-settings";

export class LokiProvider {
  public persistenceAdapter: LokiPersistenceAdapter;
  public db: Loki;
  private readonly settings: ILokiSettings;

  constructor(settings: ILokiSettings) {
    this.settings = settings;
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

  public getOrAddCollection<T extends Object>(name: string, options?: Partial<CollectionOptions<T>>): Collection<T> {
    let collection = this.db.getCollection<T>(name);
    if (collection === null) {
      collection = this.db.addCollection<T>(name, { disableChangesApi: false, ...options });
    }

    const setId = this.settings.setEntityId;
    if (setId) {
      const prop = /String/.test(Object.prototype.toString.call(setId)) ? (setId as string) : "id";
      const setEntityId = (obj: any): void => {
        obj[prop] = obj[prop] || obj.$loki;
      };
      if (collection.events.insert.every((cb: Function) => cb.name !== "setEntityId")) {
        collection.on("insert", setEntityId);
      }
    }

    return collection;
  }
}
