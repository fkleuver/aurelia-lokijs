# aurelia-lokijs

A plugin that integrates LokiJS with aurelia.

In it's current state it only "wraps" the LokiJS plugin to simplify installation.

The plan is to add templating and binding resources to expose various parts of LokiJS's api in Aurelia views in a more natural way.


## Installation
Install the npm dependency via

```bash
npm i aurelia-lokijs
```

or via the Aurelia CLI

```bash
au install aurelia-lokijs
```

Also install the peer-dependency `lokijs`:

```bash
npm i lokijs
```

If you use typescript, you'll also want the typings for `lokijs`:

```bash
npm i @types/lokijs -D
```

If you are using webpack, no additional steps are required.

## Aurelia-CLI

For Aurelia-CLI projects based on RequireJS or SystemJS, the following will install and declare the dependency in your aurelia.json:

```bash
au install aurelia-lokijs
```

or if you have already installed and only need to add the dependency to aurelia.json:

```bash
au import aurelia-lokijs
```

alternatively you can manually add the dependency to your vendor.bundles:

```json
"dependencies": [
  {
    "name": "aurelia-lokijs",
    "path": "../node_modules/aurelia-lokijs/dist/amd",
    "main": "aurelia-lokijs"
  },
  {
    "name": "lokijs",
    "path": "../node_modules/lokijs/src",
    "main": "lokijs"
  }
]
```

## Configuration
In your `main.ts` register the plugin like so:

```typescript
import { Aurelia } from "aurelia-framework"

export function configure(au: Aurelia) {
  au.use
    .standardConfiguration()
    .feature("resources");

  ...

  au.use.plugin("aurelia-lokijs"); // <----- REGISTER THE PLUGIN

  // Or, optional configuration:
  au.use.plugin("aurelia-lokijs", (settings: ILokiSettings) => {
    // Below are the default options.
    // All other LokiJS options (which you normally pass into the Loki constructor) can be set here too

    this.filename = "aurelia-lokijs.db";

    // Will use LokiIndexedAdapter if IndexedDB is defined, otherwise LocalStorageAdapter
    this.useIndexedDbIfAvailable = true;

    this.autoload = true;
    this.autosave = true;
    this.autosaveInterval = 2500;

    // Setting this to true will add an "onInsert" event to each provider-created collection
    // that copies the generated $loki to the "id" property of the saved entity (if not already set).
    // Setting this to a string will copy $loki to that property name instead.
    this.setEntityId = undefined;
  });

  au.start().then(() => au.setRoot());
}
```

## Usage
In your view model:

* Parameter decorator

```typescript
import { autoinject } from "aurelia-dependency-injection";
import { lokiCollection } from "aurelia-lokijs";

@autoinject()
export class FooVM {
  private bars: Collection<Bar>;

  constructor(@lokiCollection("bars")bars: any) {
    this.bars = bars;
  }
}
```

* Resolver

```typescript
import { LokiCollection } from "aurelia-lokijs";

@inject(LokiCollection.of("bars"))
export class FooVM {
  private bars: Collection<Bar>;

  constructor(bars: any) {
    this.bars = bars;
  }
}
```

* Manual

```typescript
import { autoinject } from "aurelia-dependency-injection";

@autoinject()
export class FooVM {
  private bars: Collection<Bar>;

  constructor(provider: LokiProvider) {
    this.bars = provider.getOrAddCollection("bars");
  }
}
```


## Building The Code


1. From the project folder, execute the following command:

  ```
  yarn/npm install
  ```
2. To build the code:

  ```
  npm run build
  ```

## Running The Tests

1. To run the tests

  ```
  npm run test
  ```

2. To continuously run the tests

```
npm run test-watch
```

