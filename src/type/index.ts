import NextStorage from "../NextStorage"

export type StorageEventKey = string | null
export type StorageEventValue = string | null
export type StoretifyValue = Record<string, any> | any[] | null | string | number
export type StoretifyEventValue = Record<string, any> | any[] | null | string | number

export type StoreArgument<T> = [string?, T?, number?]
export type StoreListener = <T extends StoretifyEvent>(e: T) => void

export type StoretifyStageMap = [null, StoretifyValue, NextStorage, NextStorage]

export type StoretifyEventValueOrNextStorage<K extends { length: number }> = StoretifyStageMap[K["length"]]

export interface StoretifyEvent extends Omit<StorageEvent, "newValue" | "oldValue"> {
  newValue: StoretifyEventValue
  oldValue: StoretifyEventValue
  native: StorageEvent
}

export interface StoreStage {
  storage: NextStorage
  set: (key: string, value: StoretifyValue, expires?: number) => void
  get: (key: string) => StoretifyValue
  remove: (key: string, soft?: boolean) => void
  has: (key: string) => boolean
  clear: () => void
  subscribe: (key: string, listener: (e: StoretifyEvent) => void) => void
  unsubscribe: (keys: string | string[], listener?: (e: StoretifyEvent) => void) => void
  getObserver(key: string): StoreListener[]
  getUsed: () => string
}

export interface StoretifyStage extends Partial<StoreStage> {
  <T, K extends StoreArgument<T>>(...rest: K): StoretifyStageMap[K["length"]]
}

export interface Storetify extends StoreStage {
  <T, K extends StoreArgument<T>>(...rest: K): StoretifyStageMap[K["length"]]
}
