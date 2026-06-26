import {
  IStringifyOptions
} from 'qs';

export type TFetcherParamsMergeable = URLSearchParams | Record<string, unknown>;

/**
 * 能够接受的 URL 参数类型
 */
export type TFetcherParams = TFetcherParamsMergeable | string | null;

export interface IFetcherParamsSerializeOptions extends IStringifyOptions {}
