System.register(["aurelia-framework", "./resolvers"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    exports_1("lokiCollection", lokiCollection);
    var aurelia_framework_1, resolvers_1;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (resolvers_1_1) {
                resolvers_1 = resolvers_1_1;
            }
        ],
        execute: function () {
        }
    };
});
