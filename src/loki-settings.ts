/**
 * Interface that extends loki's regular `options` constructor parameter with a few convenience
 * properties used by `LokiProvider`
 */
export interface ILokiSettings
  extends Partial<LokiConstructorOptions>,
    Partial<LokiConfigOptions>,
    Partial<ThrottledSaveDrainOptions> {
  /**
   * The filename that will be passed to the loki constructor
   */
  filename: string;

  /**
   * If true, will check whether `indexedDB` is available and if so, use `LokiIndexedAdapter` or
   * otherwise `LokiLocalStorageAdapter`
   */
  useIndexedDbIfAvailable: boolean;

  /**
   * If true, will add an event listener to `insert` that sets the `id` property of newly added
   * documents equal to the generated `$loki` property
   *
   * If a string, will set the property with that key instead.
   */
  setEntityId?: boolean | string;
}

// @internal
export class LokiSettings implements ILokiSettings {
  public autoload: boolean;
  public autosave: boolean;
  public autosaveInterval: string | number;

  public filename: string;
  public useIndexedDbIfAvailable: boolean;

  constructor() {
    this.filename = "aurelia-lokijs.db";
    this.useIndexedDbIfAvailable = true;
    this.autoload = true;
    this.autosave = true;
    this.autosaveInterval = 2500;
    (this as ILokiSettings).env = "BROWSER";
  }
}
