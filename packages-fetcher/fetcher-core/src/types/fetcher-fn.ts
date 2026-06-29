import {
  TFetcherConfigX,
  TFetcherConfigQuick,
  TFetcherConfigQuickJsonp
} from './config';

export type TFetcherArgsJsonp<P = void> = [string, P?] | [TFetcherConfigQuickJsonp, string, P?];
export type TFetcherArgsGet<P = void> = [string, P?] | [TFetcherConfigQuick, string, P?];
export type TFetcherArgsPost<B = void, P = void> = [string, B?, P?] | [TFetcherConfigQuick, string, B?, P?];

export interface IPromiseWithAbort<T> extends Promise<T> {
  abort(): void;
}

/**
 * 执行请求的方法定义
 */
export type TFetcherFnRequest<X = object> = <T = unknown>(config: TFetcherConfigX<X>) => Promise<T>;

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
export interface IFetcherFnJsonp<X = object> {
  <T = unknown>(url: string): Promise<T>;
  <T = unknown, P = unknown>(url: string, params: P): Promise<T>;
  <T = unknown>(config: TFetcherConfigQuickJsonp<X>, url: string): Promise<T>;
  <T = unknown, P = unknown>(config: TFetcherConfigQuickJsonp<X>, url: string, params: P): Promise<T>;
}

export interface IFetcherFnJsonpWithAbort<X = object> {
  <T = unknown>(url: string): IPromiseWithAbort<T>;
  <T = unknown, P = unknown>(url: string, params: P): IPromiseWithAbort<T>;
  <T = unknown>(config: TFetcherConfigQuickJsonp<X>, url: string): IPromiseWithAbort<T>;
  <T = unknown, P = unknown>(config: TFetcherConfigQuickJsonp<X>, url: string, params: P): IPromiseWithAbort<T>;
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
export interface IFetcherFnGet<X = object> {
  <T = unknown>(url: string): Promise<T>;
  <T = unknown, P = unknown>(url: string, params: P): Promise<T>;
  <T = unknown>(config: TFetcherConfigQuick<X>, url: string): Promise<T>;
  <T = unknown, P = unknown>(config: TFetcherConfigQuick<X>, url: string, params: P): Promise<T>;
}

export interface IFetcherFnGetWithAbort<X = object> {
  <T = unknown>(url: string): IPromiseWithAbort<T>;
  <T = unknown, P = unknown>(url: string, params: P): IPromiseWithAbort<T>;
  <T = unknown>(config: TFetcherConfigQuick<X>, url: string): IPromiseWithAbort<T>;
  <T = unknown, P = unknown>(config: TFetcherConfigQuick<X>, url: string, params: P): IPromiseWithAbort<T>;
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
export interface IFetcherFnPost<X = object> {
  <T = unknown>(url: string): Promise<T>;
  <T = unknown, B = unknown>(url: string, body: B): Promise<T>;
  <T = unknown, B = unknown, P = unknown>(url: string, body: B, params: P): Promise<T>;
  <T = unknown>(config: TFetcherConfigQuick<X>, url: string): Promise<T>;
  <T = unknown, B = unknown>(config: TFetcherConfigQuick<X>, url: string, body: B): Promise<T>;
  <T = unknown, B = unknown, P = unknown>(config: TFetcherConfigQuick<X>, url: string, body: B, params: P): Promise<T>;
}

export interface IFetcherFnPostWithAbort<X = object> {
  <T = unknown>(url: string): Promise<T>;
  <T = unknown, B = unknown>(url: string, body: B): IPromiseWithAbort<T>;
  <T = unknown, B = unknown, P = unknown>(url: string, body: B, params: P): IPromiseWithAbort<T>;
  <T = unknown>(config: TFetcherConfigQuick<X>, url: string): IPromiseWithAbort<T>;
  <T = unknown, B = unknown>(config: TFetcherConfigQuick<X>, url: string, body: B): IPromiseWithAbort<T>;
  <T = unknown, B = unknown, P = unknown>(config: TFetcherConfigQuick<X>, url: string, body: B, params: P): IPromiseWithAbort<T>;
}
