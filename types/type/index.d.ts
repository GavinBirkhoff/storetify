import NextStorage from "../PowerStorage";
export declare type StorageEventKey = string | null;
export declare type StorageEventValue = string | null;
export declare type NextStorageEventValue = Partial<any> | null | string;
export declare type NextStorageEventType = "storage" | "setItemEvent";
export declare type StoreArgument<T> = [string?, T?, number?];
export declare type StoreListener = (e?: DispatchPublishEvent) => void;
export declare type LocalStoreStageMap = [null, NextStorageEventValue, NextStorage, NextStorage];
export declare type NextStorageEventValueOrNextStorage<K extends {
    length: number;
}> = LocalStoreStageMap[K["length"]];
export interface DispatchPublishEvent extends Partial<Omit<StorageEvent, "newValue" | "oldValue">> {
    key: StorageEventKey;
    newValue: NextStorageEventValue;
    oldValue: NextStorageEventValue;
    type: NextStorageEventType;
}
export interface IDispatchEvent extends Event {
    key: StorageEventKey;
    newValue: NextStorageEventValue;
    oldValue: NextStorageEventValue;
}
export interface StoreStage {
    localStore: NextStorage;
    set: (key: string, value: Partial<any> | string | null, expires?: number) => void;
    get: (key: string) => null | Partial<any> | string;
    remove: (key: string) => void;
    has: (key: string) => boolean;
    clear: () => void;
    subscribe: (key: string, action: (e: DispatchPublishEvent) => void) => void;
    unsubscribe: (keys: string | string[], action?: (e: DispatchPublishEvent) => void) => void;
}
export interface LocalStoreStage extends Partial<StoreStage> {
    <T, K extends StoreArgument<T>>(...rest: K): LocalStoreStageMap[K["length"]];
}
export interface LocalStorePro extends StoreStage {
    <T, K extends StoreArgument<T>>(...rest: K): LocalStoreStageMap[K["length"]];
}
export declare type LocalStoragePro = NextStorage;
