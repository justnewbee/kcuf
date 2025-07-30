export interface IXhrOptions {
  method?: string;
  timeout?: number;
  signal?: AbortSignal | null;
  withCredentials?: boolean; // default true
  headers?: HeadersInit | Record<string, string | number | boolean>;
  body?: XMLHttpRequestBodyInit | null;
  onProgress?(progress: number): void; // progress 范围 [0, 1]
}

/**
 * 模仿 `Response` 对象，注意 `fetch` 的 `Response` 对象还包含以下额外属性（这里不加）
 *
 * - body: ReadableStream;
 * - bodyUsed: boolean;
 * - redirected: boolean;
 * - statusText: string;
 * - type: string; // basic
 */
export interface IXhrResponse<T = unknown> {
  ok: boolean; // 跟 status 有关，对应 status 在 200-299 范围内，所以 status 和 statusText 就直接忽略了
  status: number;
  url: string;
  headers: Headers;
  json(): Promise<T>;
  text(): Promise<string>;
  blob(): Promise<null>;
  arrayBuffer(): Promise<null>;
}
