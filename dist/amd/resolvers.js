var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-dependency-injection", "./loki-provider"], function (require, exports, aurelia_dependency_injection_1, loki_provider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // tslint:disable:no-reserved-keywords
    // tslint:disable:function-name
    /**
     * Used to inject a Loki Collection as a dependency, using the specified name and options
     */
    let LokiCollection = LokiCollection_1 = class LokiCollection {
        /**
         * Creates an instance of the LokiCollection class
         * @param name The name of the collection to resolve
         * @param options The options to pass to the collection
         */
        constructor(name, options) {
            this.name = name;
            this.options = options;
        }
        /**
         * Creates a LokiCollection Resolver for the supplied collection name and options
         * @param name The name of the collection to resolve
         * @param options The options to pass to the collection
         */
        static of(name, options) {
            return new LokiCollection_1(name, options);
        }
        /**
         * Called by the container to get the LokiProvider to retrieve the configured collection from
         * @param container The container to resolve the LokiProvider that retrieves the configured collection
         */
        get(container) {
            const lokiProvider = container.get(loki_provider_1.LokiProvider);
            return lokiProvider.getOrAddCollection(this.name, this.options);
        }
    };
    LokiCollection = LokiCollection_1 = __decorate([
        aurelia_dependency_injection_1.resolver(),
        __metadata("design:paramtypes", [String, Object])
    ], LokiCollection);
    exports.LokiCollection = LokiCollection;
    var LokiCollection_1;
});
