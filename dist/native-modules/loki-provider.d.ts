/// <reference types="lokijs" />
import { ILokiSettings } from "./loki-settings";
/**
 * Wrapper class that instantiates the loki db & adapter, and manages collections
 */
export declare class LokiProvider {
    persistenceAdapter: LokiPersistenceAdapter;
    db: Loki;
    private readonly settings;
    private readonly entityIdProperty;
    private readonly setEntityIdAppliedKey;
    constructor(settings: ILokiSettings);
    /**
     * Gets the collection with the specified name
     *
     * Creates a new one if it does not exist, otherwise returns the existing one
     */
    getOrAddCollection<T extends Object>(name: string, options?: Partial<CollectionOptions<T>>): Collection<T>;
    private applySetEntityId(collection);
    private setEntityId;
}
