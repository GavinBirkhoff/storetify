import NextStorage from "../NextStorage";
export type StorageEventKey = string | null;
export type StorageEventValue = string | null;
export type NextStorageValue = Record<string, any> | any[] | null | string | number;
export type NextStorageEventValue = Record<string, any> | any[] | null | string | number;
export type StoreArgument<T> = [string?, T?, number?];
export type StoreListener = <T extends StoretifyEvent>(e: T) => void;
export type StoretifyStageMap = [null, NextStorageValue, NextStorage, NextStorage];
export type NextStorageEventValueOrNextStorage<K extends {
    length: number;
}> = StoretifyStageMap[K["length"]];
export interface StoretifyEvent extends Omit<StorageEvent, "newValue" | "oldValue"> {
    newValue: NextStorageEventValue;
    oldValue: NextStorageEventValue;
    native: StorageEvent;
}
export interface StoreStage {
    storage: NextStorage;
    set: (key: string, value: NextStorageValue, expires?: number) => void;
    get: (key: string) => NextStorageValue;
    remove: (key: string, soft?: boolean) => void;
    has: (key: string) => boolean;
    clear: () => void;
    subscribe: (key: string, listener: (e: StoretifyEvent) => void) => void;
    unsubscribe: (keys: string | string[], listener?: (e: StoretifyEvent) => void) => void;
    getObserver(key: string): StoreListener[];
    getUsed: () => string;
}
export interface StoretifyStage extends Partial<StoreStage> {
    <T, K extends StoreArgument<T>>(...rest: K): StoretifyStageMap[K["length"]];
}
export interface Storetify extends StoreStage {
    <T, K extends StoreArgument<T>>(...rest: K): StoretifyStageMap[K["length"]];
}
