/// <reference types="lokijs" />
import { ILokiSettings } from "./loki-settings";
export declare class LokiProvider {
    persistenceAdapter: LokiPersistenceAdapter;
    db: Loki;
    private readonly settings;
    constructor(settings: ILokiSettings);
    getOrAddCollection<T extends Object>(name: string, options?: Partial<CollectionOptions<T>>): Collection<T>;
}
