# @kcuf/fetcher-core

Fetcher 核心实现，不带 transport，这样可以在多端环境下使用，支持：

1. Web
2. Node
3. 小程序

## FAQ

### 拦截器最佳实践

拦截器的核心调用是 `fetcher.interceptRequest|Response(interceptor)`，但一个拦截器的最佳方式是让使用者无忧使用，即使用拦截器的开发者，
不应知道这个拦截器用在何处。因此，一个拦截器最佳的输出方式是一个接收 `Fetcher` 实例的方法。

同时，一个拦截器可以有默认选项，所以建议写成 `createInterceptor(options): FetcherIntercept__`，并且把参数暴露给 `intercept` 方法。

以下，我们以添加日志（`Log`）为例，附上相关代码（注意这里为了说明方便，都写在了一起）：

```ts
import {
  Fetcher,
  FetcherConfig,
  FetcherIntercept__
} from '@kcuf/fetcher-core';

export interface IFetcherConfigLog {
  logTitle?: string;
}

export interface IFetcherConfigAugmentedLog extends FetcherConfig, IFetcherConfigLog {}

export interface IInterceptLogOptions {
  // ...
}

function createInterceptorResponseFulfilled(options: IInterceptLogOptions): FetcherIntercept__ {}

export default function interceptLog(fetcher: Fetcher, options?: IInterceptLogOptions, priority?: number): () => void {
  return fetcher.interceptResponse(createInterceptorResponseFulfilled(options), undefined, priority);
}

export type {
  IFetcherConfigLog as FetcherConfigLog,
  IInterceptLogOptions as InterceptLogOptions
};
```

最佳实践：

1. 尽量仅依赖 `@kcuf/fetcher-core`
2. 仅输出 `intercept` 方法，接收 `fetcher: Fetcher` 为第一参数，可以额外添加别的参数
3. 拦截器方法使用工厂方法创建，这样可以允许传配置
4. 若对 `FetcherConfig` 有类型扩展，则输出 `FetcherConfigXx`（这里 Xx 代表拦截器的名字，仅含扩展部分）

### 为什么在 Response 的 `headers` 里获取不到某 header？

自定义 Header 需要显式地暴露，后端需要添加 [Access-Control-Expose-Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Expose-Headers)。