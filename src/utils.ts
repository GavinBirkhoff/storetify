import { DispatchPublishEvent, IDispatchEvent, StoreListener } from "./type"

export function dispatchStorageEvent({ key, newValue, oldValue, type }: DispatchPublishEvent) {
  const setItemEvent = new Event(type) as IDispatchEvent
  setItemEvent.key = key
  setItemEvent.newValue = newValue
  setItemEvent.oldValue = oldValue
  window?.dispatchEvent(setItemEvent)
}

export function jsonParse(data: string | null) {
  const dest = data === "undefined" || data === undefined ? null : data
  return JSON.parse(dest as string)
}

export function each(funcs: StoreListener[], e: any) {
  funcs.forEach((func: StoreListener) => {
    if (typeof func === "function") {
      try {
        func(e)
      } catch (error) {
        console.warn(`has an exception in your ${func.name}()`)
      }
    }
  })
}

export default {
  dispatchStorageEvent,
  jsonParse,
  each,
}
