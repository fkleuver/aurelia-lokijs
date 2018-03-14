// tslint:disable:no-implicit-dependencies
import * as loki from "lokijs";
import { LokiIndexedDbAdapter } from "src/adapters/loki-indexed-db-adapter";
import { LokiProvider } from "src/loki-provider";
import { ILokiSettings, LokiSettings } from "src/loki-settings";

describe("LokiProvider", () => {
  let stateBackup: any;
  let dummyObj: any;
  let sut: LokiProvider;
  let settings: ILokiSettings;

  beforeAll(() => {
    stateBackup = Object.create(null);
  });

  beforeEach(() => {
    dummyObj = Object.create(Object.prototype);
    settings = new LokiSettings();
    stateBackup.checkAvailability = LokiIndexedDbAdapter.checkAvailability;
  });

  afterEach(() => {
    LokiIndexedDbAdapter.checkAvailability = stateBackup.checkAvailability;
    if (sut) {
      sut.db.deleteDatabase();
    }
  });

  describe("constructor()", () => {
    it("should initialize correctly", () => {
      sut = new LokiProvider(settings);

      expect((sut as any).settings).toBe(settings);
      expect(sut.db).toBeDefined();
      expect(sut.persistenceAdapter).toBeDefined();
    });

    it("should default to IndexedAdapter IndexedDB is defined", () => {
      sut = new LokiProvider(settings);

      expect(sut.persistenceAdapter instanceof LokiIndexedDbAdapter).toBe(true);
    });

    it("should default to LocalStorageAdapter when IndexedDB is not defined", () => {
      setIndexedDBAvailability(false);
      sut = new LokiProvider(settings);

      expect(sut.persistenceAdapter instanceof loki.LokiLocalStorageAdapter).toBe(true);
    });

    it("should use the adapter passed in via settings", () => {
      const adapter = new loki.LokiMemoryAdapter();
      settings.adapter = adapter;
      sut = new LokiProvider(settings);

      expect(sut.persistenceAdapter).toBe(adapter);
    });
  });

  describe("getOrAddCollection()", () => {
    beforeEach(() => {
      settings.autoload = false;
      settings.autosave = false;
      settings.useIndexedDbIfAvailable = false;
      settings.adapter = new loki.LokiMemoryAdapter();
    });

    it("should return a new collection if none exists yet", () => {
      sut = new LokiProvider(settings);

      const actual = sut.getOrAddCollection("foo");
      expect(actual instanceof loki.Collection).toBe(true);
    });

    it("should return the existing collection if one already exists", () => {
      sut = new LokiProvider(settings);

      const first = sut.getOrAddCollection("foo");
      const second = sut.getOrAddCollection("foo");
      expect(first).toEqual(second);
    });

    it("should add only one callback to \"insert\" if called multiple times when setEntityId is true", () => {
      settings.setEntityId = true;
      sut = new LokiProvider(settings);

      const coll = sut.getOrAddCollection("foo");
      const cbs = coll.events.insert.length;
      sut.getOrAddCollection("foo");

      expect(coll.events.insert.length).toEqual(cbs);
    });
  });

  describe("setEntityId()", () => {

    it("should set the \"id\" property of an object equal to \"$loki\" on insert when setEntityId is true", () => {
      settings.setEntityId = true;
      sut = new LokiProvider(settings);

      sut.getOrAddCollection("foo").insertOne(dummyObj);

      expect(dummyObj.id).toEqual(1);
    });

    it("should set the \"id\" property of an object if it is undefined", () => {
      settings.setEntityId = true;
      sut = new LokiProvider(settings);

      dummyObj.id = undefined;
      sut.getOrAddCollection("foo").insertOne(dummyObj);

      expect(dummyObj.id).toEqual(1);
    });

    it("should set the \"id\" property of an object if it is null", () => {
      settings.setEntityId = true;
      sut = new LokiProvider(settings);

      dummyObj.id = null;
      sut.getOrAddCollection("foo").insertOne(dummyObj);

      expect(dummyObj.id).toEqual(1);
    });

    it("should set the \"id\" property of an object if it is a string", () => {
      settings.setEntityId = true;
      sut = new LokiProvider(settings);

      dummyObj.id = "1";
      sut.getOrAddCollection("foo").insertOne(dummyObj);

      expect(dummyObj.id).toEqual(1);
    });

    it("should NOT set the \"id\" property of an object if it is a number", () => {
      settings.setEntityId = true;
      sut = new LokiProvider(settings);

      dummyObj.id = 1234;
      sut.getOrAddCollection("foo").insertOne(dummyObj);

      expect(dummyObj.id).toEqual(1234);
    });

    it("should NOT set the \"id\" property of an object if it is a Number (object)", () => {
      settings.setEntityId = true;
      sut = new LokiProvider(settings);

      // tslint:disable-next-line:no-construct
      dummyObj.id = new Number(1234);
      sut.getOrAddCollection("foo").insertOne(dummyObj);

      expect(dummyObj.id).toEqual(1234);
    });

    it("should set the specified property of an object equal to \"$loki\" on insert when setEntityId is a string", () => {
      settings.setEntityId = "bar";
      sut = new LokiProvider(settings);

      sut.getOrAddCollection("foo").insertOne(dummyObj);

      expect(dummyObj.bar).toEqual(1);
    });
  })

});

function setIndexedDBAvailability(isAvailable: boolean): void {
  LokiIndexedDbAdapter.checkAvailability = () => isAvailable;
}
