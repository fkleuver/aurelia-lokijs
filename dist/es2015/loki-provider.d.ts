/// <reference types="lokijs" />
import { ILokiSettings } from "./loki-settings";
export declare class LokiProvider {
    persistenceAdapter: LokiPersistenceAdapter;
    db: Loki;
    private readonly settings;
    private readonly entityIdProperty;
    private readonly setEntityIdAppliedKey;
    constructor(settings: ILokiSettings);
    getOrAddCollection<T extends Object>(name: string, options?: Partial<CollectionOptions<T>>): Collection<T>;
    private applySetEntityId(collection);
    private setEntityId;
}
