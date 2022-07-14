import { DispatchPublishEvent } from "./type";
export declare function dispatchStorageEvent({ key, newValue, oldValue, type }: DispatchPublishEvent): void;
export declare function jsonParse(data: string | null): any;
export declare function each(funcs: any[], e: any): void;
declare const _default: {
    dispatchStorageEvent: typeof dispatchStorageEvent;
    jsonParse: typeof jsonParse;
    each: typeof each;
};
export default _default;
