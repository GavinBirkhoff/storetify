import NextStorage from "../PowerStorage";
export declare type StorageEventKey = string | null;
export declare type StorageEventValue = string | null;
export declare type NextStorageValue = Partial<any> | any[] | null | string | number;
export declare type NextStorageEventValue = Partial<any> | any[] | null | string | number;
export declare type StoreArgument<T> = [string?, T?, number?];
export declare type StoreListener = <T extends StoreProEvent>(e: T) => void;
export declare type LocalStoreStageMap = [null, NextStorageValue, NextStorage, NextStorage];
export declare type NextStorageEventValueOrNextStorage<K extends {
    length: number;
}> = LocalStoreStageMap[K["length"]];
export interface StoreProEvent extends Omit<StorageEvent, "newValue" | "oldValue"> {
    newValue: NextStorageEventValue;
    oldValue: NextStorageEventValue;
    native: StorageEvent;
}
export interface StoreStage {
    localStore: NextStorage;
    set: (key: string, value: NextStorageValue, expires?: number) => void;
    get: (key: string) => NextStorageValue;
    remove: (key: string, soft?: boolean) => void;
    has: (key: string) => boolean;
    clear: () => void;
    subscribe: (key: string, listener: (e: StoreProEvent) => void) => void;
    unsubscribe: (keys: string | string[], listener?: (e: StoreProEvent) => void) => void;
    getObserver(key: string): StoreListener[];
    getUsed: () => string;
}
export interface LocalStoreStage extends Partial<StoreStage> {
    <T, K extends StoreArgument<T>>(...rest: K): LocalStoreStageMap[K["length"]];
}
export interface LocalStorePro extends StoreStage {
    <T, K extends StoreArgument<T>>(...rest: K): LocalStoreStageMap[K["length"]];
}
export declare type LocalStoragePro = NextStorage;
