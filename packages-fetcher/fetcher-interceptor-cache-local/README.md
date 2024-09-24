# @kcuf/fetcher-interceptor-cache-local

> 本地内存缓存

在页面生命周期内，能够保证仅真实调一次接口，优先级 `20`，必须在 `Biz` 之后，因为 biz 结果的处理影响缓存的数据。