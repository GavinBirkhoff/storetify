import NextStorage from "./PowerStorage"
import { LocalStorePro, LocalStoreStage, LocalStoreStageMap, StoreArgument, StoreStage } from "./type"

const storage = NextStorage.getInstance()

const store: LocalStoreStage = function <T, K extends StoreArgument<T>>(...rest: K): LocalStoreStageMap[K["length"]] {
  const len = rest.length
  const [key, value, expires] = rest
  if (len === 1 && typeof key === "string") {
    return storage.get(key) as LocalStoreStageMap[K["length"]]
  }
  if (len >= 2 && typeof key === "string") {
    if (value === undefined) {
      return storage.remove(key) as LocalStoreStageMap[K["length"]]
    }
    if (typeof value === "function") {
      return storage.set(key, value(), expires) as LocalStoreStageMap[K["length"]]
    }
    return storage.set(key, value, expires) as LocalStoreStageMap[K["length"]]
  }
  return null as LocalStoreStageMap[K["length"]]
}

function init(): LocalStorePro {
  const propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(storage))
  propertyNames.forEach(key => {
    if (key !== "constructor" && key !== "getStore") {
      const value = storage[key as keyof NextStorage]
      const storeKey = key as keyof LocalStorePro
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

  return store as LocalStorePro
}

export default init()
