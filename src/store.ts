import PowerStorage from "./PowerStorage"
import { DispatchPublishEvent, LocalStorePro, LocalStoreRaw, StorageValueType } from "./type"
import { jsonParse } from "./utils"

const storage = PowerStorage.getInstance()

const store: LocalStoreRaw = function (...rest: any[]): StorageValueType | PowerStorage {
  const len = rest.length
  const [key, value, expires] = rest
  if (len === 1 && typeof key === "string") {
    return storage.get(key)
  }
  if (len >= 2 && typeof key === "string") {
    if (value === undefined) {
      return storage.remove(key)
    }
    if (typeof value === "function") {
      return storage.set(key, value(), expires)
    }
    return storage.set(key, value, expires)
  }
  return null
}

function init(): LocalStorePro {
  Object.entries(Object.getPrototypeOf(storage)).forEach(item => {
    const [key, value] = item
    if (key !== "constructor" && key !== "getStore") {
      ;(<any>store)[key] = (value as any).bind(storage)
    }
  })
  store.localStore = storage
  function dispatchPublish({ key, newValue, oldValue, type }: DispatchPublishEvent) {
    if (newValue !== oldValue) {
      if (type === "storage") {
        const parseNewValue = jsonParse(newValue as any)?.value ?? null
        const parseOldValue = jsonParse(oldValue as any)?.value ?? null
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
    const setItemEventFunc = (e: any) => {
      dispatchPublish(e)
    }
    const storageFunc = (e: any) => {
      dispatchPublish(e)
    }
    window.addEventListener("setItemEvent", setItemEventFunc)
    window.addEventListener("storage", storageFunc)
  }
  return store as LocalStorePro
}

export default init()
