import store, { StoreProEvent } from "../src/index"

describe("local-store-pro api test", () => {
  test("test setNamespace getNamespace", () => {
    const namespace = "my-store"
    ;(store as any).setNamespace(namespace)
    expect((store as any).getNamespace()).toBe(namespace)
  })
  test("test setStore getStore", () => {
    ;(store as any).setStore(localStorage)
    expect((store as any).getStore).toBeUndefined()
  })
  test("test set get remove", () => {
    const key = "token"
    const key2 = "token2"
    store.set(key, 1)
    expect(store.get(key)).toBe(1)
    store.set(key2, 2)
    expect(store.get(key2)).toBe(2)
    store.set(key, "1")
    expect(store.get(key)).toBe("1")
    store.remove(key2)
    expect(store.get(key2)).toBe(null)
  })
  test("test set null undefined", () => {
    store("theme", null)
    expect(store("theme")).toBe(null)
    store("theme", "dark")
    expect(store("theme")).toBe("dark")
    store("theme", undefined) // remove theme
    expect(store("theme")).toBe(null)
  })
  test("test set get from expires", async () => {
    store.set("food", 3, 3)
    expect(store.get("food")).toBe(3)
    const food = await new Promise(resolve =>
      setTimeout(function () {
        resolve(store.get("food"))
      }, 3001),
    )
    expect(food).toBe(null)
  }, 7000)
  test("test set subscribe", done => {
    store.set("token", 3, 3)
    store.subscribe("token", ev => {
      expect(ev.newValue).toBe(5)
      expect(ev.oldValue).toBe(null)
      done()
    })
    setTimeout(() => {
      store.set("token", 5, 3)
    }, 3001)
  }, 7000)
  test("test has", () => {
    store("color", "#fff")
    expect(store.has("color")).toBeTruthy()
    expect(store.has("color2")).toBeFalsy()
  })
  test("test subscribe unsubscribe", () => {
    store.subscribe("key1", () => {})
    store.subscribe("key2", () => {})
    store.subscribe("key3", () => {})
    store.unsubscribe(["key1", "key2"])
  })
  test("test Exception", () => {
    // not input message to terminal
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {})
    store.set(1 as any, 1)
    expect(store(1 as any)).toBe(null)
    expect(consoleWarnSpy).toHaveBeenCalledWith("store failed, entry a valid string key.")
  })
  test("test subscribe and expires", done => {
    store("token-6823", "xxxx", 5)
    const callFun = (ev: StoreProEvent) => {
      if (ev.newValue) {
        done()
      }
    }
    store.subscribe("token-6823", callFun)
    setTimeout(() => {
      const token = store("token-6823")
      expect(token).toBeNull()
      store.set("token-6823", "xxxx", 10)
    }, 5000)
  }, 7000)
})
