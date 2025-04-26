import store from "../src"
import type { Storetify, StoretifyValue, StoretifySafeValue, StoretifyEvent, StoreListener } from "../src/type"

describe("type", () => {
  test("just test type", () => {
    // ✅ Test storing primitive types
    store("string", "hello")
    store("number", 123)
    store("boolean", true)
    store("null", null)

    // ✅ Test storing objects and arrays
    store("object", { name: "test", nested: { age: 1 } })
    store("array", [1, 2, { a: "b" }])

    // ✅ Test lazy value setting via functions
    store("lazy", () => "computed")
    store("lazyObj", () => ({ computed: true }))

    // ✅ Test retrieving values
    const stringValue: StoretifySafeValue<string> = store("string")
    const objectValue: StoretifySafeValue = store("object")
    const arrayValue: StoretifySafeValue = store("array")

    // ✅ Test deleting a key
    store("string", undefined)

    // ✅ Test `set`, `get`, `remove`
    store.set("foo", "bar")
    const val = store.get<string>("foo")
    store.remove("foo")

    // ✅ Test `has`
    const exists: boolean = store.has("object")

    // ✅ Test `clear`
    store.clear()

    // ✅ Test `subscribe` and `unsubscribe`
    const listener = (e: StoretifyEvent<{ a: number }>) => {
      e.oldValue.a = 1
      console.log(e.key, e.oldValue, e.newValue, e.type)
    }
    store.subscribe("object", listener)
    store.unsubscribe("object", listener)
    store.unsubscribe(["object", "array"])

    // ✅ Test `getObserver` and `getUsed`
    const observers = store.getObserver("object")
    const used = store.getUsed()

    // ✅ Test calling with multiple arguments
    store("multiArg", () => "multi", 3600)
    store("multiArg", "direct", 3600)

    // ✅ Type inference test
    function typedSet<T extends StoretifyValue>(key: string, value: T) {
      store(key, val)
      const result: StoretifySafeValue<T> = store(key)
      return result
    }
    const result = typedSet("typed", { x: 1, y: "z" })

    console.log("All storetify type tests passed.")
  })
})
