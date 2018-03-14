"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const lokijs_1 = __importDefault(require("lokijs"));
const loki_indexed_db_adapter_1 = require("./adapters/loki-indexed-db-adapter");
/**
 * Wrapper class that instantiates the loki db & adapter, and manages collections
 */
class LokiProvider {
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
    /**
     * Makes this provider instance globally reachable through LokiProvider.INSTANCE
     */
    makeGlobal() {
        LokiProvider.INSTANCE = this;
        return this;
    }
    /**
     * Gets the collection with the specified name
     *
     * Creates a new one if it does not exist, otherwise returns the existing one
     */
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
}
exports.LokiProvider = LokiProvider;
