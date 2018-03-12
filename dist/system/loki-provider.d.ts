/// <reference types="lokijs" />
import { ILokiSettings } from "./loki-settings";
export declare class LokiProvider {
    persistenceAdapter: LokiPersistenceAdapter;
    db: Loki;
    constructor(settings: ILokiSettings);
    getOrAddCollection<T extends Object>(name: string): Collection<T>;
}
