// 错误定义，用于 error.name，
export enum EFetcherErrorName {
  /**
   * 超时（非原生，前端模拟）
   */
  TIMEOUT = 'FetcherError.Timeout',
  /**
   * 网络错误（未到业务层）
   */
  NETWORK = 'FetcherError.Network',
  /**
   * 响应状态错误 response.ok 为 false，即 response.status 在 200-299 之外时的错误
   */
  RESPONSE_STATUS = 'FetcherError.ResponseStatus',
  /**
   * 响应解析错误，一般出现在非 JSON 的场景
   */
  RESPONSE_PARSE = 'FetcherError.ResponseParse',
  /**
   * 跳过网络请求和响应拦截器，直接到最末
   */
  SKIP_NETWORK = 'FetcherError:SkipNetwork',
  // 以下用于扩展
  BIZ = 'FetcherError.Biz'
}