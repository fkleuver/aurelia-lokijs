import { Container, inject } from "aurelia-dependency-injection";
import * as loki from "lokijs";
import { LokiProvider } from "src/loki-provider";
import { ILokiSettings, LokiSettings } from "src/loki-settings";
import { LokiCollection } from "src/resolvers";

describe("LokiCollection.of()", () => {
  let container: Container;
  let provider: LokiProvider;
  let settings: ILokiSettings;

  beforeEach(() => {
    settings = new LokiSettings();
    settings.adapter = new loki.LokiMemoryAdapter();
    provider = new LokiProvider(settings)
    container = new Container();
    container.registerInstance(LokiProvider, provider);
  });

  @inject(LokiCollection.of("bars"))
  class Foo {
    public collection: Collection<any>;
    constructor(collection: any) {
      this.collection = collection;
    }
  }

  it("should inject a Loki Collection", () => {
    const foo = container.get(Foo) as Foo;

    expect(foo.collection).toBeDefined();
    expect(foo.collection.name).toEqual("bars");
  });
});
