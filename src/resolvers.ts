import { Container, resolver } from "aurelia-dependency-injection";
import { LokiProvider } from "./loki-provider";

// tslint:disable:no-reserved-keywords
// tslint:disable:function-name

/**
 * Used to inject a Loki Collection as a dependency, using the specified name and options
 */
@resolver()
export class LokiCollection {
  // @internal
  protected name: string;
  // @internal
  protected options?: Partial<CollectionOptions<any>>;

  /**
   * Creates an instance of the LokiCollection class
   * @param name The name of the collection to resolve
   * @param options The options to pass to the collection
   */
  constructor(name: string, options?: Partial<CollectionOptions<any>>) {
    this.name = name;
    this.options = options;
  }

  /**
   * Creates a LokiCollection Resolver for the supplied collection name and options
   * @param name The name of the collection to resolve
   * @param options The options to pass to the collection
   */
  public static of(name: string, options?: Partial<CollectionOptions<any>>): LokiCollection {
    return new LokiCollection(name, options);
  }

  /**
   * Called by the container to get the LokiProvider to retrieve the configured collection from
   * @param container The container to resolve the LokiProvider that retrieves the configured collection
   */
  public get(container: Container): Collection<any> {
    const lokiProvider = container.get(LokiProvider) as LokiProvider;

    return lokiProvider.getOrAddCollection(this.name, this.options);
  }
}
