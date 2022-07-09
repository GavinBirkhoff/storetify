import PowerStorage from "../PowerStorage"

export type StorageKeyType = string | null
export type StorageValueType = Partial<any> | null | string
export type StorageEventType = "storage" | "setItemEvent"

export interface DispatchPublishEvent extends Partial<Event> {
  key: StorageKeyType
  newValue: StorageValueType
  oldValue: StorageValueType
  type: StorageEventType
}

export interface IDispatchEvent extends Event {
  key: StorageKeyType
  newValue: StorageValueType
  oldValue: StorageValueType
}

type StoreType = (...rest: any[]) => Partial<any> | null | undefined

export interface SubStore extends StoreType {
  set: (key: string, value: Partial<any> | string | null, expires?: number) => void
  get: (key: string) => null | Partial<any> | string
  remove: (key: string) => void
  has: (key: string) => boolean
  clear: () => void
  subscribe: (key: string, action: () => void) => void
  unsubscribe: (keys: string | string[], action?: () => void) => void
}
