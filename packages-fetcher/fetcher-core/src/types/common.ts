import {
  IStringifyOptions
} from 'qs';

export type TInterceptorEject = () => void;

export interface IBuildUrlOptions {
  urlBase?: string;
  urlCacheBusting?: boolean;
  params?: Record<string, unknown> | string;
  serializeOptions?: IStringifyOptions;
}

export type TFetcherHeaders = Record<string, string | number | boolean> | Headers;

export type TFetcherParamsMergeable = Record<string, unknown> | URLSearchParams;

/**
 * 能够接受的 URL 参数类型
 */
export type TFetcherParams = TFetcherParamsMergeable | string | null;

export type TFetcherBodyMergeable = Record<string, unknown> | URLSearchParams | FormData;

/**
 * 能够接受 body 类型，是 `BodyInit` 的子集 + `Record<string, unknown>`
 *
 * `BodyInit = ReadableStream | Blob | BufferSource | FormData | URLSearchParams | string`
 */
export type TFetcherBody = TFetcherBodyMergeable | Blob | string | null;

export interface IErrorExtendedInfo {
  /**
   * 预留扩展字段 - 错误码
   */
  code?: string;
  /**
   * 预留扩展字段 - 错误标题
   */
  title?: string;
  /**
   * 预留扩展字段 - 原始 response 中的数据；强行把返回变成出错时需要
   */
  responseData?: unknown;
}

export interface ISerializeParamsOptions extends IStringifyOptions {}

export interface ISerializeBodyOptions extends IStringifyOptions {}

/**
 * 将 fetch 和 jsonp 各自的 response 同化后的类型，剔除 fetch Response 中不关心的部分（body、bodyUsed、ok、
 * redirected、status、statusText、type 等），提取 `.json()` 后 resolve 的数据
 */
export interface IFetcherResponse<T = unknown> {
  readonly url: string;
  readonly headers: Headers;
  readonly data: T;
}
