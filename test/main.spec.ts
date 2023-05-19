import store from "../src/index"
import fn from "../example/fn"

jest.mock("../example/fn")
const keyPrefix = "test-local-store-pro"
const getKey = (key: string) => keyPrefix + key
describe("local-store-pro", () => {
  test("store() return null", () => {
    expect(store()).toBe(null)
  })
  test("test store obj", () => {
    store.set("obj", { type: "object", value: { a: 1 } })
    expect(store("obj")).toEqual({ type: "object", value: { a: 1 } })
  })
  test("test store(a,b)", () => {
    store(getKey("a"), "a")
    expect(store(getKey("a"))).toBe("a")
    store(getKey("a"), undefined)
    expect(store(getKey("a"))).toBe(null)
    store(getKey("a-func"), () => "a-func")
    expect(store(getKey("a-func"))).toBe("a-func")
  })
  test("test store.set(a,b)", () => {
    store.set(getKey("b"), "b")
    expect(store.get(getKey("b"))).toBe("b")
  })
  test("test expires", done => {
    store.set("c", "c", 1)
    expect(store.get("c")).toBe("c")
    setTimeout(() => {
      expect(store.get("c")).toBe(null)
      done()
    }, 2000)
    expect(store.get("c")).toBe("c")
  })
  test("test subscribe", () => {
    const fn = jest.fn()
    store.subscribe("d", fn)
    store("d", "d1")
    expect(fn).toBeCalledTimes(1)
    store("d", "d1")
    expect(fn).toBeCalledTimes(1)
    store("d", "d2")
    expect(fn).toBeCalledTimes(2)
    store.remove("d")
    expect(fn).toBeCalledTimes(3)
    expect(store("d")).toBe(null)
  })
  test("test subscribes", () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()
    store("e", "e1")
    store.subscribe("e", fn1)
    store.subscribe("e", fn2)
    store("e", "e2")
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(1)
    store.clear()
    expect(fn1).toBeCalledTimes(2)
    expect(fn2).toBeCalledTimes(2)
  })
  test("test subscribe unsubscribe", () => {
    const fn1 = fn.fn1
    const fn2 = fn.fn2
    const fn3 = fn.fn3

    store("f", "f1")
    store.subscribe("f", fn1)
    store.subscribe("f", fn2)
    store.subscribe("f", fn3)
    store("f", "f2")
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(1)
    expect(fn3).toBeCalledTimes(1)
    store.unsubscribe("f", fn1)
    store("f", "f3")
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(2)
    expect(fn3).toBeCalledTimes(2)
    store.remove("f")
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(3)
    expect(fn3).toBeCalledTimes(3)
    store.set("f", "f5")
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(3)
    expect(fn3).toBeCalledTimes(3)
    store.subscribe("f", fn1)
    store.subscribe("f", fn2)
    store.subscribe("f", fn3)
    store.set("f", "f6")
    store.set("f", "f7")
    expect(fn1).toBeCalledTimes(3)
    expect(fn2).toBeCalledTimes(5)
    expect(fn3).toBeCalledTimes(5)
    store.unsubscribe("f")
    store.set("f", "f7")
    expect(fn1).toBeCalledTimes(3)
    expect(fn2).toBeCalledTimes(5)
    expect(fn3).toBeCalledTimes(5)
  })
  test("clear localStorage", () => {
    store("token", "admin")
    expect(store("token")).toBe("admin")
    localStorage.clear()
    expect(store("token")).toBe(null)
  })
  test("Type of test", () => {
    store(
      "str",
      function () {
        return 123
      },
      1,
    )
    store.subscribe("str", () => {})
    store.subscribe("str", e => {
      e?.newValue, e?.oldValue
    })
    store("mm", 0)
    store("str", 98).get("98k")
  })
})
