import NextStorage from "../PowerStorage"

export type StorageEventKey = string | null
export type StorageEventValue = string | null
export type NextStorageEventValue = Partial<any> | any[] | null | string | number

export type StoreArgument<T> = [string?, T?, number?]
export type StoreListener = <T extends StoreProEvent>(e?: T) => void

export type LocalStoreStageMap = [null, NextStorageEventValue, NextStorage, NextStorage]

export type NextStorageEventValueOrNextStorage<K extends { length: number }> = LocalStoreStageMap[K["length"]]

export interface StoreProEvent extends Omit<StorageEvent, "newValue" | "oldValue"> {
  newValue: NextStorageEventValue
  oldValue: NextStorageEventValue
  native: StorageEvent
}

export interface StoreStage {
  localStore: NextStorage
  set: (key: string, value: Partial<any> | string | null, expires?: number) => void
  get: (key: string) => null | Partial<any> | string
  remove: (key: string) => void
  has: (key: string) => boolean
  clear: () => void
  subscribe: (key: string, action: (e?: StoreProEvent) => void) => void
  unsubscribe: (keys: string | string[], action?: (e?: StoreProEvent) => void) => void
  getUsed: () => string
}

export interface LocalStoreStage extends Partial<StoreStage> {
  <T, K extends StoreArgument<T>>(...rest: K): LocalStoreStageMap[K["length"]]
}

export interface LocalStorePro extends StoreStage {
  <T, K extends StoreArgument<T>>(...rest: K): LocalStoreStageMap[K["length"]]
}

export type LocalStoragePro = NextStorage
