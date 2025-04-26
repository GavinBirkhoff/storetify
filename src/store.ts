import NextStorage from "./NextStorage"
import { Storetify, StoreArgument, StoreStage, StoretifyValue } from "./type"

const storage = NextStorage.getInstance()

function store<T extends StoretifyValue | ((...args: any) => StoretifyValue)>(
  key: string,
  value: T,
  expires?: number,
): StoreStage
function store<T = StoretifyValue>(key: string): T
function store(
  ...rest: StoreArgument<StoretifyValue | ((...args: any) => StoretifyValue)>
): StoretifyValue | StoreStage {
  const len = rest.length
  const [key, value, expires] = rest
  if (len === 1 && typeof key === "string") {
    return storage.get(key)
  }
  if (len >= 2 && typeof key === "string") {
    if (value === undefined) {
      return storage.remove(key) as unknown as StoreStage
    }
    if (typeof value === "function") {
      return storage.set(key, value(), expires) as unknown as StoreStage
    }
    return storage.set(key, value, expires) as unknown as StoreStage
  }
  return null
}

function init(): Storetify {
  const propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(storage))
  propertyNames.forEach(key => {
    if (key !== "constructor" && key !== "getStore") {
      const value = storage[key as keyof NextStorage]
      const storeKey = key as keyof Storetify
      if (typeof value === "function") {
        ;(store as any)[storeKey] = value.bind(storage)
      } else {
        // store[storeKey] = value
      }
    }
  })
  ;(store as any).storage = storage
  function dispatchPublish(ev: StorageEvent) {
    const { key, newValue, oldValue, isTrusted } = ev
    if (key !== null && newValue !== oldValue) {
      storage.publish(key, ev, true)
      return
    }
    if (key === null && newValue === null && oldValue === null) {
      storage.publishAll(ev)
      // Consistent behavior with storage.clear(), while unsubscribe.
      if (isTrusted !== true) {
        storage.unsubscribe()
      }
    }
  }
  // SP TODO
  if (!storage.hasBindWindowEventStorage()) {
    storage.bindWindowEventStorage(true)

    const handleStorageChange = (e: StorageEvent) => {
      dispatchPublish(e)
    }

    window.addEventListener("storage", handleStorageChange)
  }

  return store as Storetify
}

export default init()
