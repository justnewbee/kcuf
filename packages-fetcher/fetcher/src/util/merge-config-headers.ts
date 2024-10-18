import {
  TFetcherHeaders,
  IFetcherConfig
} from '../types';

import mergeHeaders from './merge-headers';

export default function mergeConfigHeaders(config: IFetcherConfig, headers?: TFetcherHeaders): void {
  if (!headers) {
    return;
  }
  
  if (!config.headers) {
    config.headers = headers;
    
    return;
  }
  
  config.headers = mergeHeaders(config.headers, headers);
}
