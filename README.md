The encapsulation of local storage localStorage, provides expiration time setting and subscription functions, provides simple API use, no dependencies, and the compression is only 3.71KB (gzipped: 1.37KB).

English | [简体中文](https://github.com/GavinBirkhoff/pro-store/blob/main/README.zh-CN.md) ![GitHub](https://img.shields.io/github/license/gavinbirkhoff/pro-store)

## ✨ Features

- Better to use localStorage
- Easy to learn and use
- Expiration time of support data
- Support for monitoring data changes
- Built with TypeScript, providing full type definition files

## 🪄 Install

```bash
# npm install
npm install pro-store
```

## 🏗️ Build

```bash
npm run build
```

## 🧪 Test

```bash
npm test
```

# 🔨 Usage

or manually download and include in your HTML **pro-store.min.js**，you can also pass [UNPKG](https://unpkg.com/pro-store/lib/) to download：

```html
<script src="https://unpkg.com/pro-store/lib/pro-store.min.js"></script>
<script type="text/javascript">
store("test","gavin");
</script>
```

or

```js
import store from 'pro-store';
store("test","pro-store");
```

## ⚙️ API

### set

Storing data
`store.set(key, data[, expires]);`
or store(key, data[, expires]);

```js
store.set("test","1"); //⇒1
store.set("test","1",3); //⇒1 test expires after 3 seconds
```

### get

Get string data of key
`store.get(key)`
or `store(key)`

```js
store.get("test"); // Get the string data of test
store("test"); // Same function as above
```

### remove

delete data under key `store.remove(key)`

```js
store.remove("test");
```

### clear

clear all `key/data` `store.clear()`

```js
store.clear(); // Will publish all key value changes
```

### has

Check if it exists and return `true/false` `store.has(key)`

```js
store.has("test"); //⇒true
```

### subscribe

Subscribe to test data changes

```js
store.subscribe("test",(e)=>{})
```

For the event variable e, it is an abbreviated object from the StorageEvent object, which provides some practical properties, which can be used to observe the changes of key-value pairs well, as shown in the following table：

| Property | Type | Description|
| -------- | ------ | ------------------------------------------------------------ |
| key| `string` | The key to store the value, modify, delete according to it |
| oldValue | Partial<any> \| null \| string| last value |
| newValue | Partial<any> \| null \| string| current new value |
| type| `string` | event type |

### unsubscribe

Unsubscribe from test data changes

```js
const someName = (e)=>{}
store.subscribe("test",someName)
store.unsubscribe("test",someName) // ⚠️Note that unsubscribe cannot be an anonymous method
store.unsubscribe("test") // ⚠️Note that all subscriptions to test will be cancelled including anonymous functions
```

## Compatibility

source：[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

| Feature | Chrome | Firefox (Gecko) | Internet Explorer | Opera| Safari (WebKit) | iPhone(IOS) | Android | Opera Mobile | Window Phone |
| ------------ | ------ | --------------- | ----------------- | ------ | --------------- | ----------- | ------- | ------------ | ------------ |
| localStorage | 4+ | 3.5+| 8+| 10.50+ | 4+| 3.2+| 2.1+| 11+| 8+ |

## local storage size

`JSON.stringify(localStorage).length` How much capacity is currently occupied

[Detect the upper limit of localstore capacity](https://arty.name/localstorage.html)
