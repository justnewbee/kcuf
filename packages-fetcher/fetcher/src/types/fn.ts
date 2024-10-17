import {
  IFetcherConfig
} from './config';
import {
  IFetcherOptionsForQuickFn,
  IFetcherOptionsForQuickJsonp
} from './options';

/**
 * 执行请求的方法定义
 */
export interface IFetcherFnRequest {
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
export interface IFetcherFnJsonp {
  <T = unknown>(url: string): Promise<T>;
  <T = unknown, P = unknown>(url: string, params: P): Promise<T>;
  <T = unknown>(options: IFetcherOptionsForQuickJsonp, url: string): Promise<T>;
  <T = unknown, P = unknown>(options: IFetcherOptionsForQuickJsonp, url: string, params: P): Promise<T>;
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
export interface IFetcherFnGetAlike {
  <T = unknown>(url: string): Promise<T>;
  <T = unknown, P = unknown>(url: string, params: P): Promise<T>;
  <T = unknown>(options: IFetcherOptionsForQuickFn, url: string): Promise<T>;
  <T = unknown, P = unknown>(options: IFetcherOptionsForQuickFn, url: string, params: P): Promise<T>;
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
export interface IFetcherFnPostAlike {
  <T = unknown>(url: string): Promise<T>;
  <T = unknown, B = unknown>(url: string, body: B): Promise<T>;
  <T = unknown, B = unknown, P = unknown>(url: string, body: B, params: P): Promise<T>;
  <T = unknown>(options: IFetcherOptionsForQuickFn, url: string): Promise<T>;
  <T = unknown, B = unknown>(options: IFetcherOptionsForQuickFn, url: string, body: B): Promise<T>;
  <T = unknown, B = unknown, P = unknown>(options: IFetcherOptionsForQuickFn, url: string, body: B, params: P): Promise<T>;
}