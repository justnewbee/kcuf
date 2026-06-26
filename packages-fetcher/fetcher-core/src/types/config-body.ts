import {
  IStringifyOptions
} from 'qs';

export type TFetcherBodyMergeable = Record<string, unknown> | URLSearchParams | FormData;

/**
 * 能够接受 body 类型，是 `BodyInit` 的子集 + `Record<string, unknown>`
 *
 * `BodyInit = ReadableStream | Blob | BufferSource | FormData | URLSearchParams | string`
 */
export type TFetcherBody = TFetcherBodyMergeable | Blob | string | null;

export type TFetcherBodyNormalized = null | string | URLSearchParams | FormData | Blob;

export interface IFetcherBodySerializeOptions extends IStringifyOptions {}
