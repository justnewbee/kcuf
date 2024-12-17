import {
  JsonpOptions
} from '@kcuf/fetcher-jsonp';

import {
  IFetcherConfig
} from '../types';

export default function buildOptionsForJsonp(config: IFetcherConfig): JsonpOptions {
  return {
    timeout: config.timeout,
    charset: config.charset,
    jsonpCallback: config.jsonpCallback,
    jsonpCallbackFunction: config.jsonpCallbackFunction,
    signal: config.signal
  };
}
