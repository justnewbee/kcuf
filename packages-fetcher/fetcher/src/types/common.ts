import {
  IStringifyOptions
} from 'qs';

export interface IRemover {
  (): void;
}

export interface IBuildUrlOptions {
  urlBase?: string;
  urlCacheBusting?: boolean;
  params?: Record<string, unknown> | string;
  serializeOptions?: IStringifyOptions;
}

export type TFetcherHeaders = Record<string, string | number | boolean>;

/**
 * 能够接受的 URL 参数类型
 */
export type TFetcherParams = Record<string, unknown> | string | null;

/**
 * 能够接受 body 类型
 */
export type TFetcherBody = Record<string, unknown> | string | null;

export interface ISerializeParamsOptions extends IStringifyOptions {}

export interface ISerializeBodyOptions extends IStringifyOptions {}

export type TFetcherResponseType = 'json' | 'text';

/**
 * 将 fetch 和 jsonp 各自的 response 同化后的类型，剔除 fetch Response 中不关心的部分（body、bodyUsed、ok、
 * redirected、status、statusText、type 等），提取 `.json()` 后 resolve 的数据
 */
export interface IFetcherResponse<T = unknown> {
  readonly url: string;
  readonly headers: Record<string, string>;
  readonly data: T;
}
