# @kcuf/sls-logger-web

基于 `@kcuf/sls-logger-base` 封装的 SLS 工厂方法包。

## Features

* 🚜 利用 `fetch` 发送日志，2000ms 的超时设定，静默失败
* ⏱️ 默认 5s 的静默时间，让行应用初始化期间的业务请求，提升业务性能
* 🗳️ 利用 POST 批量提交日志，避免同一时间内大量的网络请求
* 📌 支持设定 TOPIC 前缀
* 🧽 支持采样率
* 🎈 支持自定义忽略策略（可用于避免不合法的日志上报等）

## APIs

* `createLogger(options: CreateLoggerOptions): SlsLogger` 生成 sls 方法的工厂方法，该方法挂载 6 个快速方法
* `generateCreateLogger(options: GenerateCreateLoggerOptions): CreateLogger` 生成上边的方法的工厂方法

## 如何使用

业务代码使用 `createLogger` 的产物，即 `sls` 方法，你可以这样调用：

```ts
sls(topic);
sls(topic, payload);
sls(options, topic);
sls(options, topic, payload);
```

以上，`options` 可用于覆盖创建 `sls` 的时候的 `topicPrefix`、`sampling` 等工厂默认的参数，也可以立即发送日志，默认所有的日志会在一定的时间内积压，以避免和业务逻辑竞争。

更多内容见 `@kcuf/sls-logger-base` 的说明。

## 记录的数据

由于这是一个工厂包，不参与业务，因此不会增加记录的参数，可以在业务封装中使用 `defaultParams` 并入业务需要的基础数据，比如浏览器信息等：

```ts
export default createLogger({
  defaultParams() {
    return {
      // 基础参数最佳实践，推荐全大写
      UA: navigator.userAgent
    };
  }
});
```

## FAQ

### 为什么调用 `sls(..)` 后要等一段时间才见发送日志？

1. 为了让行业务请求，加载完成后会有默认 5s 的静默时间，这段时间内，不会发送请求
2. 每条日志都不会立即发送，而是进入一个队列，并刷新等待时间（默认 200ms），等到空闲的时候才进行批量发送

## 有的日志很重要，不想因为静默时间或等待时间漏掉，需要立即上报，怎么办？

利用 `instant` 参数：

```ts
sls({
  instant: true
}, topic, payload);
```

### 不想全量，如何进行采样上报？

#### 全量采样

在 `createLogger` 的时候设置采样率，这样它生的 `sls` 将全量采样：

```ts
export default createLogger({
  sampling: 0.6 // 全量日志默认 60% 的采样率
});
```

#### 单个采样

调用 `sls` 的时候传入采样率，这样只会针对这一次调用进行采样：

```ts
sls({
  sampling: 0.3 // 该日志 30% 采样率，覆盖全量采样率
}, topic, payload);
```

## 单测

这里的测试比较简单，更详细的测试在 `@kcuf/sls-logger-base`，100% 的覆盖率。
