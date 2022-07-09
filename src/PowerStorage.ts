import { DispatchPublishEvent } from "./type"
import { dispatchStorageEvent, each, jsonParse } from "./utils"
/**
 * PowerStorage
 * Power localStorage
 */
class PowerStorage {
  namespace = "local-store-pro"

  protected store = localStorage

  protected observers = new Map()

  protected hasBindWindow = false

  // eslint-disable-next-line no-use-before-define
  protected static storage: PowerStorage | null = null

  public static getInstance(): PowerStorage {
    if (!PowerStorage.storage) {
      PowerStorage.storage = new PowerStorage()
    }
    return PowerStorage.storage
  }

  public setHasBindWindow(e: boolean) {
    this.hasBindWindow = e
  }

  public getHasBindWindow() {
    return this.hasBindWindow
  }

  public setNamespace(space: string) {
    this.namespace = space
  }

  public getNamespace() {
    return this.namespace
  }

  public setStore(store: any) {
    this.store = store
  }

  protected getStore() {
    return this.store
  }

  public set(key: string, value: Partial<any> | string | null, expires?: number) {
    const val = JSON.stringify({ value, expires: expires ? expires * 1000 + Date.now() : expires })
    try {
      const newValue = value
      const oldValue = this.get(key)
      dispatchStorageEvent({ key, newValue, oldValue, type: "setItemEvent" })
    } finally {
      this.store.setItem(key, val)
    }
    return this
  }

  public get(key: string): null | Partial<any> | string {
    const val = this.store.getItem(key) ?? null
    if (val === null) {
      return val
    }
    const value = jsonParse(val)
    if (!value.expires || Date.now() <= value.expires) {
      return value.value
    }
    this.remove(key)
    return null
  }

  public has(key: string): boolean {
    const val = this.store.getItem(key)
    if (val === null) return false
    return true
  }

  public publish(key: string | any[], e: any, force = false) {
    if (!key && !force && !this.has(key)) return
    if (Array.isArray(key)) {
      each(key, e)
    } else {
      const channels = this.observers.get(key) ?? []
      each(channels, e)
    }
  }

  public publishAll(e: any) {
    this.observers.forEach((item: any[]) => {
      this.publish(item, e, true)
    })
  }

  public subscribe(key: string, action: (e?: DispatchPublishEvent) => void) {
    const { observers } = this
    const actions = observers.get(key)
    if (actions) {
      actions.push(action)
      // this.observers.set(key, actions)
    } else {
      this.observers.set(key, [action])
    }
    return this
  }

  public unsubscribe(keys?: string | string[], action?: () => void) {
    if (Array.isArray(keys)) {
      keys.forEach(key => {
        this.observers.delete(key)
      })
    } else if (typeof keys === "string" && action) {
      let actions = this.observers.get(keys)
      if (action.name) {
        actions = actions.filter((item: any) => item.name !== action.name)
        this.observers.set(keys, actions)
      }
    } else if (typeof keys === "string") {
      this.observers.delete(keys)
    } else {
      this.observers.clear()
    }
  }

  public remove(key: string) {
    const oldValue = jsonParse(this.store.getItem(key) as string)?.value ?? null
    dispatchStorageEvent({ key, newValue: null, oldValue, type: "setItemEvent" })
    this.unsubscribe(key)
    this.store.removeItem(key)
    return this
  }

  public clear() {
    dispatchStorageEvent({ key: null, newValue: null, oldValue: null, type: "storage" })
    this.unsubscribe()
    this.store.clear()
  }
}
export default PowerStorage.getInstance()
