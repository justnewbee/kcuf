/**
 * 纯 JSONP options
 */
export interface IJsonpOptions {
  /**
   * 与服务端的参数名协议，告诉服务端，当你接收到参数名为此配置值的时候，需要返回 JSONP 格式，默认为 jsonp
   */
  jsonpCallback?: string;
  /**
   * 通常 jsonpCallback 配置值对应的方法是自动创建的，它会放在 window 下，如果你需要自己指定方法，可以用它，
   * 但必须自己保证可以通过 `window[此配置值]` 访问到它
   */
  jsonpCallbackFunction?: string;
  charset?: string;
  timeout?: number;
  /**
   * 让 JSONP 得以 abort，和 fetch 类型一致
   */
  signal?: AbortSignal | null;
}

/**
 * 模仿 Response 对象，fetch 的 Response 对象还包含以下额外属性
 *
 * - body: ReadableStream;
 * - bodyUsed: boolean;
 * - headers: Headers; // JSONP 无法有 headers
 * - redirected: boolean;
 * - statusText: string;
 * - type: string; // basic
 */
export interface IJsonpResponse<T = unknown> {
  ok: true; // 跟 status 有关，对应 status 在 200-299 范围内，所以 status 和 statusText 就直接忽略了
  status: 200; // Jsonp 只能 200
  url: string;
  json(): Promise<T>;
  text(): Promise<string>;
}
