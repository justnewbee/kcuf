import {
  FetchOptions
} from '@kcuf/fetcher-fetch';
import {
  JsonpOptions
} from '@kcuf/fetcher-jsonp';

import {
  EFetcherErrorName
} from '../enum';

import {
  TFetcherBody,
  TFetcherHeaders,
  TFetcherParams,
  TFetcherResponseType,
  ISerializeParamsOptions,
  ISerializeBodyOptions,
  IFetcherResponse
} from './common';

/* =================================================================
 * FetcherConfig
 * ================================================================= */

/**
 * `new Fetcher` 时的 config，用于定义默认值，在执行请求时，将被传入的 config 混合
 */
export interface IFetcherConfigDefault extends Omit<FetchOptions, 'method' | 'headers' | 'body'>, JsonpOptions {
  /**
   * - 支持除了标准 HTTP 请求的 GET/POST/DELETE/PUT/PATCH + JSONP
   * - 大小写无关，但内部一开始就会转成大写，建议统一用大写
   * - 不要手动调用 HEAD/OPTIONS
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
   */
  method?: string;
  /**
   * config 中需要有 url
   */
  url?: string;
  /**
   * 如果指定 `urlBase` 且 `url` 不是绝对路径，会将两者拼接起来
   *
   * 注意 `urlBase` 和 `url` 之间不会被自动拼上 `/`，可认为它只是一个前缀
   */
  urlBase?: string;
  /**
   * 是否在 url 上拼接 `_cache_busting_` 参数，值用的是时间戳，一般来说不需要
   */
  urlCacheBusting?: boolean;
  /**
   * 约束 FetchOptions.headers
   */
  headers?: TFetcherHeaders;
  /**
   * URL search 参数，纯的 `fetch/jsonp` 的 url 要求是已经拼接好参数的 url。
   *
   * `{ url: '/url', params: { a: 1, b: 2} }` 等价于 `{ url: '/url', params: 'a=1&b=2' }` 等价于 `{ url: '/url?a=1&b=2' }`
   */
  params?: TFetcherParams;
  /**
   * POST/PUT 等请求体
   */
  body?: TFetcherBody;
  /**
   * 如果传入的 `params` 是对象，用 `qs` 来序列化它的参数
   */
  serializeParams?: ISerializeParamsOptions;
  /**
   * 自定义 `body` 的 serialize
   */
  serializeBody?: ISerializeBodyOptions;
  /**
   * 对返回数据的处理，默认 `'json'`
   */
  responseType?: TFetcherResponseType;
}

/**
 * interceptor 的 config 参数，也是 Fetcher.prototype.request 的参数
 *
 * `_` 打头的是 fetcher 自己填入的，不要在调用时传入
 */
export interface IFetcherConfig extends IFetcherConfigDefault {
  /**
   * 根据 method、url、params、body 计算得到的 id，可以被拦截器使用，比如缓存、合并时需要
   */
  _id?: string;
  /**
   * 真正开始请求的时间，由最末一个 interceptor 计入，便于需要记录耗时的场景
   */
  _timeStarted?: number;
  /**
   * 在 Fetcher 内部由拦截器发起的请求
   */
  _byInterceptor?: boolean;
  /**
   * 调用时临时增加的请求拦截器，不至于影响到整个实例
   */
  additionalInterceptorsForRequest?: TInterceptRequestArgs[]; // eslint-disable-line @typescript-eslint/no-use-before-define
  /**
   * 调用时临时增加的响应拦截器，不至于影响到整个实例
   */
  additionalInterceptorsForResponse?: TInterceptResponseArgs[]; // eslint-disable-line @typescript-eslint/no-use-before-define
}

/**
 * 便捷 JSONP 方法，如果第一个参数为对象，则为 options
 */
export interface IFetcherConfigQuickJsonp extends Omit<IFetcherConfig, 'url' | 'method'> {}

/**
 * 其他便捷方法，如果第一个参数为对象，则为 options
 */
export interface IFetcherConfigQuick extends Omit<IFetcherConfig, 'url' | 'method' | 'charset' | 'jsonpCallback' | 'jsonpCallbackFunction'> {}

/* =================================================================
 * FetcherError
 * ================================================================= */

export interface IFetcherErrorExtendedInfo {
  /**
   * 预留扩展字段 - 错误标题
   */
  title?: string;
  /**
   * 预留扩展字段 - 错误码
   */
  code?: string;
  /**
   * 预留扩展字段 - 原始 response 中的数据；强行把返回变成出错时需要
   */
  responseData?: unknown;
}

/**
 * 错误
 */
export interface IFetcherError extends Error, IFetcherErrorExtendedInfo {
  config?: IFetcherConfig;
}

/**
 * 特殊错误，用于绕过网络请求
 */
export interface IFetcherErrorSpecial<T = void> extends Error {
  name: EFetcherErrorName;
  config?: IFetcherConfig;
  result: T | Promise<T>;
}

/* =================================================================
 * FetcherInterceptor
 * ================================================================= */
/**
 * 执行请求的方法定义
 */
export interface IFetcherCallRequest {
  <T = unknown>(fetcherConfig: IFetcherConfig): Promise<T>;
}

/**
 * 快捷方法定义 - JSONP
 *
 * ```js
 * jsonp(url); // 无参调用
 * jsonp(url, params); // 有参调用
 * jsonp({ // 自定义额外配置，但无法覆盖 method
 *   timeout,
 *   charset,
 *   jsonpCallback,
 *   jsonpCallbackFunction
 * }, url, params);
 * ```
 */
export interface IFetcherCallJsonp {
  <T = unknown>(url: string): Promise<T>;
  <T = unknown, P = unknown>(url: string, params: P): Promise<T>;
  <T = unknown>(options: IFetcherConfigQuickJsonp, url: string): Promise<T>;
  <T = unknown, P = unknown>(options: IFetcherConfigQuickJsonp, url: string, params: P): Promise<T>;
}

/**
 * 快捷方法定义 - 类 GET
 *
 * @example
 *
 * ```js
 * get(url); // 无参调用
 * get(url, params); // 有参调用
 * get({ // 自定义额外配置，但无法覆盖 method
 *   headers: { ... },
 *   timeout: 1234
 * }, url, params);
 * ```
 */
export interface IFetcherCallGetAlike {
  <T = unknown>(url: string): Promise<T>;
  <T = unknown, P = unknown>(url: string, params: P): Promise<T>;
  <T = unknown>(options: IFetcherConfigQuick, url: string): Promise<T>;
  <T = unknown, P = unknown>(options: IFetcherConfigQuick, url: string, params: P): Promise<T>;
}

/**
 * 快捷方法定义 - 类 POST
 *
 * @example
 *
 * ```js
 * post(url); // 无参调用
 * post(url, body); // 有参调用（仅 body）
 * post(url, body, params); // 有参调用，body 和 url 参数
 * post({ // 自定义额外配置，但无法覆盖 method
 *   headers: { ... },
 *   timeout: 1234
 * }, url, body, params);
 * ```
 */
export interface IFetcherCallPostAlike {
  <T = unknown>(url: string): Promise<T>;
  <T = unknown, B = unknown>(url: string, body: B): Promise<T>;
  <T = unknown, B = unknown, P = unknown>(url: string, body: B, params: P): Promise<T>;
  <T = unknown>(options: IFetcherConfigQuick, url: string): Promise<T>;
  <T = unknown, B = unknown>(options: IFetcherConfigQuick, url: string, body: B): Promise<T>;
  <T = unknown, B = unknown, P = unknown>(options: IFetcherConfigQuick, url: string, body: B, params: P): Promise<T>;
}

/* =================================================================
 * FetcherInterceptor
 * ================================================================= */

export type TFetcherInterceptRequestReturn = undefined | IFetcherConfig | Promise<undefined | IFetcherConfig> | never;

/**
 * Request interceptor 方法类型
 */
export interface IFetcherInterceptRequest {
  (fetcherConfig: IFetcherConfig, callRequest: IFetcherCallRequest): TFetcherInterceptRequestReturn;
}

/**
 * Response success interceptor 方法类型
 *  - T - 最终需要返回的 Promise 类型
 *  - D - 接口实际返回的 Promise 类型
 */
export interface IFetcherInterceptResponseFulfilled<T = unknown, D = T> {
  (data: D, fetcherConfig: IFetcherConfig, fetcherResponse: IFetcherResponse<T> | undefined, fetcherRequest: IFetcherCallRequest): T | never;
}

/**
 * Response error interceptor 方法类型
 */
export interface IFetcherInterceptResponseRejected<T = unknown> {
  (error: IFetcherError, fetcherConfig: IFetcherConfig, fetcherResponse: IFetcherResponse<T> | undefined, fetcherRequest: IFetcherCallRequest): T | never;
}

export type TInterceptRequestArgs = [IFetcherInterceptRequest] | [number, IFetcherInterceptRequest];
export type TInterceptResponseArgs<T = unknown, D = T> = [
  IFetcherInterceptResponseFulfilled<T, D>
] | [
  IFetcherInterceptResponseFulfilled<T, D>, IFetcherInterceptResponseRejected<T>
] | [
  undefined, IFetcherInterceptResponseRejected<T>
] | [
  number, IFetcherInterceptResponseFulfilled<T, D>
] | [
  number, IFetcherInterceptResponseFulfilled<T, D>, IFetcherInterceptResponseRejected<T>
] | [
  number, undefined, IFetcherInterceptResponseRejected<T>
];

export type TArgsForJsonp<P = void> = [string, P?] | [IFetcherConfigQuickJsonp, string, P?];
export type TArgsForGet<P = void> = [string, P?] | [IFetcherConfigQuick, string, P?];
export type TArgsForPost<B = void, P = void> = [string, B?, P?] | [IFetcherConfigQuick, string, B?, P?];