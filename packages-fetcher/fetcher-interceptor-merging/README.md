# @kcuf/fetcher-interceptor-merging

> 合并同一时间内的相同请求，不会请求多次，优先级默认 `30`，必须在 `CacheLocal` 之后，因为 `CacheLocal` 有类似的逻辑，且 cache 会优先于 merging。