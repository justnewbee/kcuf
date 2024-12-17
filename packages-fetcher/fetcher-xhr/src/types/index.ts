export interface IXhrOptions {
  method?: string;
  timeout?: number;
  signal?: AbortSignal | null;
  // 原生的 headers 的 Record<string, string> 用起来很不爽力
  headers?: HeadersInit | Record<string, string | number | boolean>;
  body?: XMLHttpRequestBodyInit;
  onProgress?: XMLHttpRequestEventTarget['onprogress'];
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
export interface IXhrResponse<T = unknown> {
  ok: boolean; // 跟 status 有关，对应 status 在 200-299 范围内，所以 status 和 statusText 就直接忽略了
  status: number;
  url: string;
  json(): Promise<T>;
  text(): Promise<string>;
}
