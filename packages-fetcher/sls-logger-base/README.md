# @kcuf/sls-logger-base

阿里云 SLS WebTracking 基础实现，将最终发送消息的方法抽象出去，使其能够很方便地应用于 Web、小程序、Node 等具体环境。

## Features

* ⏱️ 默认 5s 的静默时间，让行应用初始化期间的业务请求，提升业务性能
* 🗳️ 利用 POST 批量提交日志，避免同一时间内大量的网络请求
* 📌 支持设定 TOPIC 前缀
* 🧽 支持采样率
* 🎈 支持自定义忽略策略（可用于避免不合法的日志上报等）

## APIs

* `createLogger(sender: LogSender, options: CreateLoggerOptions): SlsLogger` 生成 sls 方法的工厂方法，该方法挂载 6 个快速方法
* `generateCreateLogger(sender: LogSender, options: GenerateCreateLoggerOptions): CreateLogger` 生成上边的方法的工厂方法

## 如何使用

业务代码不会直接用到这个包，因为它不会真正发送日志，只有设定 `sender(topic, body, headers)` 才行，可以用以下封入 `sender` 的包：

* Web 端：`@kcuf/sls-logger-web`
* Node 端：`@kcuf/sls-logger-node` TODO
* 小程序 端：`@kcuf/sls-logger-mp` TODO

业务代码最终使用的是 `createLogger` 的产物，即 `sls` 方法，你可以这样调用：

```ts
sls(topic);
sls(topic, payload);
sls(options, topic);
sls(options, topic, payload);
```

以上，`options` 可用于覆盖创建 `sls` 的时候的 `prefix`、`sampling` 等工厂默认的参数，也可以立即发送日志，默认所有的日志会在一定的时间内积压，以避免和业务逻辑竞争。

## 记录的数据

这是一个基础的库，不具有平台性或业务性，因此除了最基础的日志信息之外，不记录任何数据，以下是日志中的默认数据：

* `_TOPIC`：虽然有 `__topic__`，但这个值可能被系统篡改，因此会冗余一个 `_TOPIC`
* `_GROUP`：可用于对日志进行分类，取值 `DEBUG LOG INFO WARN ERROR FATAL`，默认 `LOG`（有需要可以自定义）

## FAQ

### 为什么调用 `sls(..)` 后要等一段时间才见发送日志？

1. 为了让行业务请求，加载完成后会有默认 5s 的静默时间，这段时间内，不会发送请求
2. 每条日志都不会立即发送，而是进入一个队列，并刷新等待时间（默认 200ms），等到空闲的时候才进行批量发送

### 有的日志很重要，不想因为静默时间或等待时间漏掉，需要立即上报，怎么办？

利用 `instant` 参数：

```ts
sls({
  instant: true
}, topic, payload);
```

### 不想全量，如何进行采样上报？

两个方式：

1. 在 `createLogger` 的时候设置采样率，这样它生的 `sls` 将全部采样
2. 调用 `sls` 的时候传入采样率，这样只会针对这一次调用进行采样

## 参考

* [Web Tracking](https://help.aliyun.com/document_detail/31752.html)
* [POST 发送日志参考文档](https://help.aliyun.com/document_detail/2771303.html)
