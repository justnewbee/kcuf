import {
  TFetcherHeaders,
  IFetcherConfig
} from '../types';

import normalizeHeaders from './normalize-headers';

export default function mergeConfigHeaders(config: IFetcherConfig, headers?: TFetcherHeaders): void {
  if (headers) {
    config.headers = {
      ...config.headers,
      ...normalizeHeaders(headers)
    };
  }
}
