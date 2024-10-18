import {
  JsonpResponse
} from '@kcuf/fetcher-jsonp';

import {
  EFetcherErrorName
} from '../enum';
import {
  IFetcherConfig,
  IFetcherResponse
} from '../types';

import createFetcherError from './create-fetcher-error';

export default async function buildResponseX<T>(response: JsonpResponse<T> | Response, responseHeaders: Record<string, string>, config: IFetcherConfig): Promise<IFetcherResponse<T>> {
  try {
    return {
      url: response.url,
      headers: responseHeaders,
      data: (config.responseType === 'text' ? await response.text() : await response.json()) as T
    };
  } catch (err) {
    throw createFetcherError(config, EFetcherErrorName.RESPONSE_PARSE, (err as Error | undefined)?.message);
  }
}
