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

If you are using webpack, no additional steps are required. Simply import a decorator and it will work.

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
  }
]
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

