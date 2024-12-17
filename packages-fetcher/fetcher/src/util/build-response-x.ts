import {
  JsonpResponse
} from '@kcuf/fetcher-jsonp';
import {
  XhrResponse
} from '@kcuf/fetcher-xhr';

import {
  EFetcherErrorName
} from '../enum';
import {
  IFetcherConfig,
  IFetcherResponse
} from '../types';

import createFetcherError from './create-fetcher-error';

export default async function buildResponseX<T>(response: JsonpResponse<T> | XhrResponse<T> | Response, config: IFetcherConfig): Promise<IFetcherResponse<T>> {
  if (!response.ok) { // 如 400 500 系列错误，此时也可能有 response.json()
    let responseData: unknown | undefined;
    
    try {
      responseData = await response.json();
    } catch (_err) {
      // ignore
    }
    
    throw createFetcherError(config, EFetcherErrorName.RESPONSE_STATUS, `Response status ${response.status}.`, {
      code: `${response.status}`,
      responseData
    });
  }
  
  try {
    return {
      url: response.url,
      headers: response.headers || new Headers(),
      data: (config.responseType === 'text' ? await response.text() : await response.json()) as T
    };
  } catch (err) {
    throw createFetcherError(config, EFetcherErrorName.RESPONSE_PARSE, (err as Error | undefined)?.message);
  }
}
