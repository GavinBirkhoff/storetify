import NextStorage from "./PowerStorage"
import {
  DispatchPublishEvent,
  LocalStorePro,
  LocalStoreStage,
  StorageEventValue,
  NextStorageEventValue,
  LocalStoreStageMap,
  StoreArgument,
} from "./type"
import { jsonParse } from "./utils"

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
  Object.entries(Object.getPrototypeOf(storage)).forEach(item => {
    const [key, value] = item
    if (key !== "constructor" && key !== "getStore") {
      ;(<any>store)[key] = (value as any).bind(storage)
    }
  })
  store.localStore = storage
  function dispatchPublish(ev: DispatchPublishEvent) {
    const { key, newValue, oldValue, type } = ev
    if (newValue !== oldValue) {
      if (type === "storage") {
        const parseNewValue = jsonParse(newValue as StorageEventValue)?.value ?? null
        const parseOldValue = jsonParse(oldValue as StorageEventValue)?.value ?? null
        storage.publish(key as string, { key, newValue: parseNewValue, oldValue: parseOldValue, type }, true)
        return
      }
      storage.publish(key as string, { key, newValue, oldValue, type }, true)
    }
    if (key === null && newValue === null && oldValue === null && type === "storage") {
      storage.publishAll({ key, newValue, oldValue, type })
    }
  }
  if (!storage.getHasBindWindow()) {
    storage.setHasBindWindow(true)
    const setItemEventListener = (e: Event) => {
      dispatchPublish(e as DispatchPublishEvent)
    }
    const storageListener = (e: StorageEvent) => {
      dispatchPublish(e as DispatchPublishEvent)
    }
    window.addEventListener("setItemEvent", setItemEventListener)
    window.addEventListener("storage", storageListener)
  }
  return store as LocalStorePro
}

export default init()
