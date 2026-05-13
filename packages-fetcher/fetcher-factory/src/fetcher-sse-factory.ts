import {
  buildUrl
} from '@kcuf/fetcher';
import fetchSse, {
  FetchSseOptions,
  FetchSseResult
} from '@kcuf/fetch-sse';

import {
  IFetcherSseFactoryOptions
} from './types';

export default function fetcherSseFactory({
  urlBase,
  getHeaders
}: IFetcherSseFactoryOptions = {}): (url: string, params?: object | null, options?: FetchSseOptions) => FetchSseResult {
  return function fetcherSse(url: string, params?: object | null, options?: FetchSseOptions): FetchSseResult {
    return fetchSse(buildUrl({
      url,
      urlBase: typeof urlBase === 'function' ? urlBase() : urlBase,
      params: params as Record<string, unknown> | undefined
    }), getHeaders ? {
      headers: getHeaders(),
      ...options
    } : options);
  };
}
