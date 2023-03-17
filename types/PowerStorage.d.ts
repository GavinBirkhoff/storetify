import { DispatchPublishEvent, NextStorageEventValue, StoreListener } from "./type";
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
    setStore<T extends Storage>(store: T): void;
    protected getStore(): Storage;
    set(key: string, value: NextStorageEventValue, expires?: number): this;
    get(key: string): NextStorageEventValue;
    has(key: string): boolean;
    publish(key: string | StoreListener[], e: DispatchPublishEvent, force?: boolean): void;
    publishAll(e: DispatchPublishEvent): void;
    subscribe(key: string, action: StoreListener): this;
    getObserver(key: string): StoreListener[] | undefined;
    unsubscribe(keys?: string | string[], action?: StoreListener): void;
    remove(key: string): this;
    clear(): void;
}
export default NextStorage;
