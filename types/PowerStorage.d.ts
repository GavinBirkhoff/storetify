import { NextStorageEventValue, StoreListener } from "./type";
/**
 * NextStorage
 * Next localStorage
 */
declare class NextStorage {
    namespace: string;
    protected store: Storage;
    protected observers: Map<any, any>;
    protected hasBindWindow: boolean;
    protected static storage: NextStorage | null;
    static getInstance(): NextStorage;
    setHasBindWindow(e: boolean): void;
    getHasBindWindow(): boolean;
    setNamespace(space: string): void;
    getNamespace(): string;
    getUsed(): string;
    setStore<T extends Storage>(store: T): void;
    protected getStore(): Storage;
    set(key: string, value: NextStorageEventValue, expires?: number): this;
    get(key: string): NextStorageEventValue;
    getItem(key: string): string | null;
    has(key: string): boolean;
    publish(observers: StoreListener[] | string, e: StorageEvent, force?: boolean, defaultKey?: string | null): void;
    publishAll(e: StorageEvent): void;
    subscribe(key: string, listener: StoreListener): this;
    getObserver(key: string): StoreListener[];
    unsubscribe(keys?: string | string[], listener?: StoreListener): void;
    remove(key: string): this;
    clear(): void;
}
export default NextStorage;
