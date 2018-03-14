// tslint:disable:no-implicit-dependencies
import { FrameworkConfiguration } from "aurelia-framework";
import { configure, ILokiSettings, LokiProvider, LokiSettings } from "src/aurelia-lokijs";

describe("configure()", () => {
  let fxconfig: FrameworkConfiguration;
  let configureSettings: (settings: ILokiSettings) => void;

  beforeEach(() => {
    fxconfig = Object.create(Object.prototype);
    fxconfig.instance = jasmine.createSpy();
    configureSettings = jasmine.createSpy();
  });

  it("should not throw if the passed-in function is undefined", () => {
    configure(fxconfig);
  });

  it("should call passed-in function if it is a function type", () => {
    configure(fxconfig, configureSettings);

    expect(configureSettings).toHaveBeenCalledWith(jasmine.any(LokiSettings));
  });

  it("should register LokiProvider as an instance with DI", () => {
    configure(fxconfig, configureSettings);

    expect(fxconfig.instance).toHaveBeenCalledWith(LokiProvider, jasmine.any(LokiProvider));
  });
});
