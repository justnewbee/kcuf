export interface ICacheLocalOptions {
  /**
   * 默认用 `FetcherConfig._hash`，也可以自己指定（不推荐自己指定）
   */
  key?: string;
  /**
   * 本地缓存的生存时间（单位 ms），一旦超过会重新请求，一般建议不小于 10000，即 10s
   * 如果 ttl > 0，但已有的缓存是无生存时间的，则一定会请求
   */
  ttl?: number;
  /**
   * 如果已经有本地缓存，且未失效，指定此参数将重置缓存且重新请求
   * 注意：连续调用此类接口没有意义，跟不设 cacheLocal 一样，建议在修改数据后重新获取数据时
   */
  overwrite?: boolean;
}

export interface ICacheLocalOptionsParsed extends Required<ICacheLocalOptions> {}
