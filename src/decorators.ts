import { getDecoratorDependencies } from "aurelia-framework";
import { LokiCollection } from "./resolvers";

/**
 * Decorator: Specifies the dependency is a Loki Collection with the provided name and options
 * @param name The name of the collection to resolve
 * @param options The options to pass to the collection
 */
export function lokiCollection(name: string, options?: Partial<CollectionOptions<any>>): ParameterDecorator {
  return (target: Object, _key: string | symbol, index: number): void => {
    const params = getDecoratorDependencies(target, "lokiCollection");
    params[index] = LokiCollection.of(name, options);
  };
}
