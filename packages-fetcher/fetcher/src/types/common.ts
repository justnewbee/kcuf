import {
  IStringifyOptions
} from 'qs';

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

export type TFetcherResponseType = 'json' | 'text';