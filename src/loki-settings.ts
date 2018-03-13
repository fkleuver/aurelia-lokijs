export interface ILokiSettings
  extends Partial<LokiConstructorOptions>,
    Partial<LokiConfigOptions>,
    Partial<ThrottledSaveDrainOptions> {
  filename: string;
  useIndexedDbIfAvailable: boolean;
  setEntityId?: boolean | string;
}

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
  }
}
