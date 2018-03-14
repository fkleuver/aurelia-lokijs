import lokijs from "lokijs";
import { LokiIndexedDbAdapter } from "./adapters/loki-indexed-db-adapter";
import { ILokiSettings } from "./loki-settings";

/**
 * Wrapper class that instantiates the loki db & adapter, and manages collections
 */
export class LokiProvider {
  public static INSTANCE: LokiProvider;

  public persistenceAdapter: LokiPersistenceAdapter;
  public db: Loki;
  private readonly settings: ILokiSettings;
  private readonly entityIdProperty: string;
  private readonly setEntityIdAppliedKey: PropertyKey;

  constructor(settings: ILokiSettings) {
    if (!settings.adapter) {
      if (settings.useIndexedDbIfAvailable && LokiIndexedDbAdapter.checkAvailability()) {
        this.persistenceAdapter = new LokiIndexedDbAdapter("default");
      } else {
        this.persistenceAdapter = new lokijs.LokiLocalStorageAdapter();
      }
    } else {
      this.persistenceAdapter = settings.adapter;
    }
    this.db = new lokijs(settings.filename, settings);

    this.settings = settings;

    const setId = settings.setEntityId;
    this.entityIdProperty = /String/.test(Object.prototype.toString.call(setId)) ? (setId as string) : "id";
    this.setEntityIdAppliedKey = Symbol("setEntityId");
  }

  /**
   * Makes this provider instance globally reachable through LokiProvider.INSTANCE
   */
  public makeGlobal(): LokiProvider {
    LokiProvider.INSTANCE = this;

    return this;
  }

  /**
   * Gets the collection with the specified name
   *
   * Creates a new one if it does not exist, otherwise returns the existing one
   */
  public getOrAddCollection<T extends Object>(name: string, options?: Partial<CollectionOptions<T>>): Collection<T> {
    let collection = this.db.getCollection<T>(name);
    if (collection === null) {
      collection = this.db.addCollection<T>(name, { disableChangesApi: false, ...options });
    }

    if (this.settings.setEntityId) {
      this.applySetEntityId(collection);
    }

    return collection;
  }

  private applySetEntityId(collection: Collection<any>): void {
    if (!Object.prototype.hasOwnProperty.call(collection, this.setEntityIdAppliedKey)) {
      Object.defineProperty(collection, this.setEntityIdAppliedKey, {
        enumerable: false,
        configurable: false,
        writable: false
      });
      collection.on("insert", this.setEntityId);
    }
  }
  private setEntityId = (obj: any) => {
    if (!/Number/.test(Object.prototype.toString.call(obj[this.entityIdProperty]))) {
      obj[this.entityIdProperty] = obj.$loki;
    }
  };
}
