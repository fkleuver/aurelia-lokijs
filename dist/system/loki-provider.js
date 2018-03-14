System.register(["lokijs", "./adapters/loki-indexed-db-adapter"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lokijs_1, loki_indexed_db_adapter_1, LokiProvider;
    return {
        setters: [
            function (lokijs_1_1) {
                lokijs_1 = lokijs_1_1;
            },
            function (loki_indexed_db_adapter_1_1) {
                loki_indexed_db_adapter_1 = loki_indexed_db_adapter_1_1;
            }
        ],
        execute: function () {
            LokiProvider = class LokiProvider {
                constructor(settings) {
                    this.setEntityId = (obj) => {
                        if (!/Number/.test(Object.prototype.toString.call(obj[this.entityIdProperty]))) {
                            obj[this.entityIdProperty] = obj.$loki;
                        }
                    };
                    if (!settings.adapter) {
                        if (settings.useIndexedDbIfAvailable && loki_indexed_db_adapter_1.LokiIndexedDbAdapter.checkAvailability()) {
                            this.persistenceAdapter = new loki_indexed_db_adapter_1.LokiIndexedDbAdapter("default");
                        }
                        else {
                            this.persistenceAdapter = new lokijs_1.default.LokiLocalStorageAdapter();
                        }
                    }
                    else {
                        this.persistenceAdapter = settings.adapter;
                    }
                    this.db = new lokijs_1.default(settings.filename, settings);
                    this.settings = settings;
                    const setId = settings.setEntityId;
                    this.entityIdProperty = /String/.test(Object.prototype.toString.call(setId)) ? setId : "id";
                    this.setEntityIdAppliedKey = Symbol("setEntityId");
                }
                getOrAddCollection(name, options) {
                    let collection = this.db.getCollection(name);
                    if (collection === null) {
                        collection = this.db.addCollection(name, Object.assign({ disableChangesApi: false }, options));
                    }
                    if (this.settings.setEntityId) {
                        this.applySetEntityId(collection);
                    }
                    return collection;
                }
                applySetEntityId(collection) {
                    if (!Object.prototype.hasOwnProperty.call(collection, this.setEntityIdAppliedKey)) {
                        Object.defineProperty(collection, this.setEntityIdAppliedKey, {
                            enumerable: false,
                            configurable: false,
                            writable: false
                        });
                        collection.on("insert", this.setEntityId);
                    }
                }
            };
            exports_1("LokiProvider", LokiProvider);
        }
    };
});
