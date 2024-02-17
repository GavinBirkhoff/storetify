import NextStorage from "./NextStorage"
import { Storetify, StoretifyStage, StoretifyStageMap, StoreArgument, StoreStage } from "./type"

const storage = NextStorage.getInstance()

const store: StoretifyStage = function <T, K extends StoreArgument<T>>(...rest: K): StoretifyStageMap[K["length"]] {
  const len = rest.length
  const [key, value, expires] = rest
  if (len === 1 && typeof key === "string") {
    return storage.get(key) as StoretifyStageMap[K["length"]]
  }
  if (len >= 2 && typeof key === "string") {
    if (value === undefined) {
      return storage.remove(key) as StoretifyStageMap[K["length"]]
    }
    if (typeof value === "function") {
      return storage.set(key, value(), expires) as StoretifyStageMap[K["length"]]
    }
    return storage.set(key, value, expires) as StoretifyStageMap[K["length"]]
  }
  return null as StoretifyStageMap[K["length"]]
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
  store.storage = storage
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
