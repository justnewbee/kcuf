import {
  FetcherConfig,
  FetcherResponseType
} from '@kcuf/fetcher-core';
import Taro from '@tarojs/taro';

export default function toTaroResponseType(responseType?: FetcherConfig['responseType']): Taro.request.Option['responseType'] {
  switch (responseType) {
  case FetcherResponseType.JSON:
  case FetcherResponseType.TEXT:
    return 'text';
  case FetcherResponseType.BLOB:
  case FetcherResponseType.BLOB_DOWNLOAD:
  case FetcherResponseType.ARRAY_BUFFER:
  case FetcherResponseType.ARRAY_BUFFER_DOWNLOAD:
    return 'arraybuffer';
  default:
    return undefined;
  }
}
