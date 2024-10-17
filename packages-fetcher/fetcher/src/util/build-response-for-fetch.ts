import {
  IFetcherConfig,
  IFetcherResponse
} from '../types';
import {
  EFetcherErrorName
} from '../enum';

import normalizeHeaderKey from './normalize-header-key';
import createFetcherError from './create-fetcher-error';
import buildResponseX from './build-response-x';

export default async function buildResponseForFetch<T>(response: Response, fetcherConfig: IFetcherConfig): Promise<IFetcherResponse<T>> {
  const responseHeaders: Record<string, string> = {};
  
  // IE 不行
  if (typeof response.headers?.forEach === 'function') { // eslint-disable-line @typescript-eslint/no-unnecessary-condition
    response.headers.forEach((v, k) => {
      responseHeaders[normalizeHeaderKey(k)] = v;
    });
  }
  
  if (!response.ok) { // 如 400 500 系列错误，此时也可能有 response.json()
    let responseData: unknown | undefined;
    
    try {
      responseData = await response.json();
    } catch (err) {
      // ignore
    }
    
    throw createFetcherError(fetcherConfig, EFetcherErrorName.RESPONSE_STATUS, `Response status ${response.status}.`, {
      code: `${response.status}`,
      responseData
    });
  }
  
  return buildResponseX(response, responseHeaders, fetcherConfig);
}
