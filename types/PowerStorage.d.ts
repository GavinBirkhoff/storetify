import { DispatchPublishEvent, StorageValueType } from "./type";
/**
 * StoragePro
 * Power localStorage
 */
declare class StoragePro {
    namespace: string;
    protected store: Storage;
    protected observers: Map<any, any>;
    protected hasBindWindow: boolean;
    protected static storage: StoragePro | null;
    static getInstance(): StoragePro;
    setHasBindWindow(e: boolean): void;
    getHasBindWindow(): boolean;
    setNamespace(space: string): void;
    getNamespace(): string;
    setStore(store: any): void;
    protected getStore(): Storage;
    set(key: string, value: StorageValueType, expires?: number): this;
    get(key: string): StorageValueType;
    has(key: string): boolean;
    publish(key: string | any[], e: any, force?: boolean): void;
    publishAll(e: any): void;
    subscribe(key: string, action: (e?: DispatchPublishEvent) => void): this;
    getObserver(key: string): any[] | undefined;
    unsubscribe(keys?: string | string[], action?: () => void): void;
    remove(key: string): this;
    clear(): void;
}
export default StoragePro;
