# @kcuf/fetcher-interceptor-login

无感登录是很常见的需求。

利用该拦截器，可以对需要登录的特定错误进行登录后重新发起请求，实现丝滑的登录流程。

## 前提

拦截器内部会判断 `error.name` 和 `error.code`，只有业务错误才会继续处理登录逻辑，因此需要 `@kcuf/fetcher-interceptor-biz`。

## 使用

```ts
import interceptLogin from '@kcuf/fetcher-interceptor-login';

import needLogin from './need-login';
import doLogin from './do-login';

interceptLogin(fetcher, {
  needLogin,
  doLogin,
  headerKeys
});
```

由于业务的特殊性，你需要自定义 `needLogin`、`doLogin` 以及可选的 `headerKeys`。

### needLogin

```ts
function needLogin(code: string, error: FetcherError): boolean;
```

### doLogin

```ts
function doLogin(): Promise<void>;
```

这是一个无参的返回 `Promise<void>` 的方法，一般来说对弹窗登录的 `Promise` 封装。

### headerKeys

> 使用 Cookie 的情况不需要。

注意：如果登录用的 **不是** Cookie，而用的是 Header 的话，需要在重试请求前将原请求 `config.headers` 中对应的值清掉。

这是由于 Fetcher 拦截器放的 header、params、body 等优先级不能比传入值高，而前一次由拦截器混入的 `headers` 在重试的二次 请求中，地位变成了传入值。

解决的办法是，使用 fetcher 提供的帮助方法 `deleteConfigHeaders` 在二次调用前清除相应的 header（可能有多个），这里提供了简便的配置属性 `headerKeys`。

## FAQ

### ❓登录窗怎么实现？

由于需要的是 `Promise`，你需要使用命令式的弹窗，而不应该是组件式。比如 `@kcuf/rc-dialog` 的命令式弹窗就很强。

### ❓登录窗登录成功，需要做什么？

登录成功，一般是设置 Cookie 或者 `localStorage` 存取用户登录相关的信息。如果是 Cookie 的话，一般不需要在做什么，因为 `fetch` 会默认带 Cookie 的，
如果记录到 `localStorage` 的，你需要写一个请求公共信息的拦截器（使用 `fetcher.interceptRequest`）。

### ❓多个接口同时报错要登录，会不会同时出现多个登录窗？

不会。内部对 `doLogin` 做了单例包裹，不会有这样的事情发生，只要登录未完成，就会在当前的登录队列中增加回调，而不会多弹窗。

### ❓登录窗可否取消登录？

可以，但取消登录后，错误就会变性，`error.name` 会变，`error.code` 不变，并且此次接口调用最终为失败。

建议在用户完成登录前，不允许用户关闭或取消。