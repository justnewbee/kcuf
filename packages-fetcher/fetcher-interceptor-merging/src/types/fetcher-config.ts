export interface IFetcherConfigAugment {
  /**
   * 默认，请求在 _id（见 @kcuf/fetcher）相同的情况下，如果同一时间内，有相同 _id 的请求会合并请求。
   *
   * 该行为在某些场景下需要设置为禁用，比如重试或者登录后重新请求的拦截器中，需要在第二次请求中取消
   */
  merging?: boolean;
}