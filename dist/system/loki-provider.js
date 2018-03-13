System.register(["lokijs", "./adapters/loki-indexed-adapter"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lokijs_1, loki_indexed_adapter_1, LokiProvider;
    return {
        setters: [
            function (lokijs_1_1) {
                lokijs_1 = lokijs_1_1;
            },
            function (loki_indexed_adapter_1_1) {
                loki_indexed_adapter_1 = loki_indexed_adapter_1_1;
            }
        ],
        execute: function () {
            LokiProvider = class LokiProvider {
                constructor(settings) {
                    this.settings = settings;
                    if (!settings.adapter) {
                        if (settings.useIndexedDbIfAvailable && loki_indexed_adapter_1.LokiIndexedAdapter.checkAvailability()) {
                            this.persistenceAdapter = new loki_indexed_adapter_1.LokiIndexedAdapter("default");
                        }
                        else {
                            this.persistenceAdapter = new lokijs_1.default.LokiLocalStorageAdapter();
                        }
                    }
                    else {
                        this.persistenceAdapter = settings.adapter;
                    }
                    this.db = new lokijs_1.default(settings.filename, settings);
                }
                getOrAddCollection(name, options) {
                    let collection = this.db.getCollection(name);
                    if (collection === null) {
                        collection = this.db.addCollection(name, Object.assign({ disableChangesApi: false }, options));
                    }
                    const setId = this.settings.setEntityId;
                    if (setId) {
                        const prop = /String/.test(Object.prototype.toString.call(setId)) ? setId : "id";
                        const setEntityId = (obj) => {
                            obj[prop] = obj[prop] || obj.$loki;
                        };
                        if (collection.events.insert.every((cb) => cb.name !== "setEntityId")) {
                            collection.on("insert", setEntityId);
                        }
                    }
                    return collection;
                }
            };
            exports_1("LokiProvider", LokiProvider);
        }
    };
});
