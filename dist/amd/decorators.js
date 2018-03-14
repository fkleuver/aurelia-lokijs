define(["require", "exports", "aurelia-framework", "./resolvers"], function (require, exports, aurelia_framework_1, resolvers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Decorator: Specifies the dependency is a Loki Collection with the provided name and options
     * @param name The name of the collection to resolve
     * @param options The options to pass to the collection
     */
    function lokiCollection(name, options) {
        return (target, _key, index) => {
            const params = aurelia_framework_1.getDecoratorDependencies(target, "lokiCollection");
            params[index] = resolvers_1.LokiCollection.of(name, options);
        };
    }
    exports.lokiCollection = lokiCollection;
});
