/// <reference types="lokijs" />
export interface ILokiSettings extends Partial<LokiConstructorOptions>, Partial<LokiConfigOptions>, Partial<ThrottledSaveDrainOptions> {
    filename: string;
    useIndexedDbIfAvailable: boolean;
}
export declare class LokiSettings implements ILokiSettings {
    autoload: boolean;
    autosave: boolean;
    autosaveInterval: string | number;
    filename: string;
    useIndexedDbIfAvailable: boolean;
    constructor();
}
