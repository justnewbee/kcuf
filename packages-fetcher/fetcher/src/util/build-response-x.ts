import {
  JsonpResponse
} from '@kcuf/fetcher-jsonp';
import {
  XhrResponse
} from '@kcuf/fetcher-xhr';
import {
  FetcherErrorName,
  FetcherResponseType,
  FetcherConfig,
  FetcherResponse,
  createFetcherError
} from '@kcuf/fetcher-core';

export default async function buildResponseX<T>(response: JsonpResponse<T> | XhrResponse<T> | Response, config: FetcherConfig): Promise<FetcherResponse<T>> {
  if (!response.ok) { // 如 400 500 系列错误，此时也可能有 response.json()
    let responseData: unknown;
    
    try {
      responseData = await response.json();
    } catch (_err) {
      // ignore
    }
    
    throw createFetcherError(config, {
      name: FetcherErrorName.RESPONSE_STATUS,
      message: `Response status ${response.status}.`,
      code: `${response.status}`,
      responseData
    });
  }
  
  function getData(): Promise<unknown> {
    if (/^application\/json/i.test(response.headers?.get('Content-Type') ?? '')) {
      return response.json();
    }
    
    switch (config.responseType) {
    case FetcherResponseType.ARRAY_BUFFER:
    case FetcherResponseType.ARRAY_BUFFER_DOWNLOAD:
      return response.arrayBuffer();
    case FetcherResponseType.BLOB:
    case FetcherResponseType.BLOB_DOWNLOAD:
      return response.blob();
    case FetcherResponseType.TEXT:
      return response.text();
    default:
      return response.json();
    }
  }
  
  try {
    return {
      url: response.url,
      headers: response.headers ?? new Headers(),
      data: await getData() as T
    };
  } catch (err) {
    throw createFetcherError(config, {
      originalError: err,
      name: FetcherErrorName.RESPONSE_PARSE
    });
  }
}
