/// <reference types="lokijs" />
/**
 * Decorator: Specifies the dependency is a Loki Collection with the provided name and options
 * @param name The name of the collection to resolve
 * @param options The options to pass to the collection
 */
export declare function lokiCollection(name: string, options?: Partial<CollectionOptions<any>>): ParameterDecorator;
