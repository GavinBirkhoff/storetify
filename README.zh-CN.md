![GitHub](https://img.shields.io/github/license/gavinbirkhoff/pro-store)
本地存储localStorage的封装，提供过期时间设置和订阅功能，提供简单API使用，没有依赖，压缩只有 3.81KB(gzipped: 1.39KB)。
<div align="center">
[English](https://github.com/gavinbirkhoff/pro-store/README.md) | 简体中文
</div>

## ✨ Features

- 更好的去使用localStorage
- 易学易用
- 支持数据的过期时间
- 支持数据变化的监听
- 使用 TypeScript 构建，提供完整的类型定义文件

# 🪄 安装

```bash
# npm 安装
npm install pro-store
```

## 🏗️ 构建

```bash
npm run build
```

## 🧪 测试

```bash
npm test
```

# 🔨 使用

或者在您的HTML中手动下载并引入 **pro-store.min.js**，你也可以通过 [UNPKG](https://unpkg.com/pro-store/lib/) 进行下载：

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

# ⚙️ API

### set

存储数据
`store.set(key, data[, expires]);`
效果相同`store(key, data[, expires]);`

```js
store.set("test","1"); //⇒1
store.set("test","1",3); //⇒1 3秒后test过期
```

### get

获取key的字符串数据
`store.get(key)`
效果相同`store(key)`

```js
store.get("test"); // 获取test的字符串数据
store("test"); // 功能同上
```

### remove

删除key下的数据 `store.remove(key)`

```js
store.remove("test");
```

### clear

清空所有 `key/data` `store.clear()`

```js
store.clear(); // 会发布所有key值的变化
```

### has

判断是否存在并返回 `true/false` `store.has(key)`

```js
store.has("test"); //⇒true
```

### subscribe

订阅test的数据变化

```js
store.subscribe("test",(e)=>{})
```

对于事件变量e，是一个来自StorageEvent对象的简略对象，提供了一些实用的属性，可以很好的观察键值对的变化，如下表：

| Property | Type | Description|
| -------- | ------ | ------------------------------------------------------------ |
| key| `string` | 存储值的键，根据其修改、删除|
| oldValue | `Partial<any> | null | string`| 上一次的值 |
| newValue | `Partial<any> | null | string`| 当前新的值 |
| type| `string` | 事件类型 |

### unsubscribe

取消订阅test的数据变化

```js
const someName = (e)=>{}
store.subscribe("test",someName)
store.unsubscribe("test",someName) // ⚠️注意，取消订阅不能是匿名方法
store.unsubscribe("test") // ⚠️注意，会取消test的所有订阅包括匿名函数
```

## 兼容

来源：[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

| 特性 | Chrome | Firefox (Gecko) | Internet Explorer | Opera| Safari (WebKit) | iPhone(IOS) | Android | Opera Mobile | Window Phone |
| ------------ | ------ | --------------- | ----------------- | ------ | --------------- | ----------- | ------- | ------------ | ------------ |
| localStorage | 4+ | 3.5+| 8+| 10.50+ | 4+| 3.2+| 2.1+| 11+| 8+ |

## 本地存储大小

`JSON.stringify(localStorage).length` 当前占用多大容量

[检测localstore容量上限](https://arty.name/localstorage.html)
