/// <reference types="lokijs" />
import { Container } from "aurelia-dependency-injection";
/**
 * Used to inject a Loki Collection as a dependency, using the specified name and options
 */
export declare class LokiCollection {
    /**
     * Creates an instance of the LokiCollection class
     * @param name The name of the collection to resolve
     * @param options The options to pass to the collection
     */
    constructor(name: string, options?: Partial<CollectionOptions<any>>);
    /**
     * Creates a LokiCollection Resolver for the supplied collection name and options
     * @param name The name of the collection to resolve
     * @param options The options to pass to the collection
     */
    static of(name: string, options?: Partial<CollectionOptions<any>>): LokiCollection;
    /**
     * Called by the container to get the LokiProvider to retrieve the configured collection from
     * @param container The container to resolve the LokiProvider that retrieves the configured collection
     */
    get(container: Container): Collection<any>;
}
