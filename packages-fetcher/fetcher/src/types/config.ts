import {
  IStringifyOptions
} from 'qs';

import {
  FetchOptions
} from '@kcuf/fetcher-fetch';
import {
  JsonpOptions
} from '@kcuf/fetcher-jsonp';

import {
  TFetcherBody,
  TFetcherParams
} from './common';
import {
  TInterceptRequestArgs,
  TInterceptResponseArgs
} from './interceptor';

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
   */
  urlBase?: string;
  /**
   * 是否在 url 上拼接 `_cache_busting_` 参数，一般来说不需要
   */
  urlCacheBusting?: boolean;
  /**
   * 约束 FetchOptions.headers
   */
  headers?: Record<string, string | number | boolean>;
  /**
   * URL search 参数，纯的 fetch/jsonp 的 url 要求是已经拼接好参数的 url。
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
  paramsSerializeOptions?: IStringifyOptions;
  /**
   * 自定义 `body` 的 serialize
   */
  bodySerializeOptions?: IStringifyOptions;
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
  additionalInterceptorsForRequest?: TInterceptRequestArgs[];
  /**
   * 调用时临时增加的响应拦截器，不至于影响到整个实例
   */
  additionalInterceptorsForResponse?: TInterceptResponseArgs[];
}