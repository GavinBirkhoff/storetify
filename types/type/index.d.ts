import PowerStorage from "../PowerStorage";
export declare type StorageKeyType = string | null;
export declare type StorageValueType = Partial<any> | null | string;
export declare type StorageEventType = "storage" | "setItemEvent";
export interface DispatchPublishEvent extends Partial<Event> {
    key: StorageKeyType;
    newValue: StorageValueType;
    oldValue: StorageValueType;
    type: StorageEventType;
}
export interface IDispatchEvent extends Event {
    key: StorageKeyType;
    newValue: StorageValueType;
    oldValue: StorageValueType;
}
interface StorePro {
    localStore: PowerStorage;
    set: (key: string, value: Partial<any> | string | null, expires?: number) => void;
    get: (key: string) => null | Partial<any> | string;
    remove: (key: string) => void;
    has: (key: string) => boolean;
    clear: () => void;
    subscribe: (key: string, action: () => void) => void;
    unsubscribe: (keys: string | string[], action?: () => void) => void;
}
export interface LocalStoreRaw extends Partial<StorePro> {
    (...rest: any[]): StorageValueType | PowerStorage;
}
export interface LocalStorePro extends StorePro {
    (...rest: any[]): StorageValueType | PowerStorage;
}
export {};
