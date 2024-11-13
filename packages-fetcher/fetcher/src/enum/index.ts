// 错误定义，用于 `error.name`，注意 AbortError 不在这里，依然保持原样
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
  // 以下用于扩展
  /**
   * 在 interceptor-biz 中使用
   *
   * 后端一般对接口都会有统一的封装，裸出数据的情况虽也有，但并不多，对于前端来说，需要把业务数据从
   * 后端的这层封装中提取出来。
   * 对于接口请求来说，是成功的，但提取业务数据时，能够认为接口「业务上失败」（通常会伴有错误码）
   */
  BIZ = 'FetcherError.Biz',
  /**
   * 在 interceptor-login 中使用
   *
   * 针对用户主动取消登录，修改错误 `error.name`（可以不改 `error.code`）
   */
  LOGIN_CANCELLED = 'FetcherError.LoginCancelled'
}
