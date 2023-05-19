import { StoreListener } from "./type";
export declare function dispatchStorageEvent({ key, newValue, oldValue, type, }: Pick<StorageEvent, "key" | "newValue" | "oldValue" | "type">): void;
export declare function jsonParse(data: string | null): any;
export declare function each(funcs: StoreListener[], ev: StorageEvent, defaultKey: string | null): void;
export declare function isValidKey(key: string): void;
declare const _default: {
    dispatchStorageEvent: typeof dispatchStorageEvent;
    jsonParse: typeof jsonParse;
    each: typeof each;
};
export default _default;
