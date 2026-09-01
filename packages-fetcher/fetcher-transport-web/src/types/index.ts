import {
  JsonpOptions
} from '@kcuf/fetcher-jsonp';
import {
  FetcherConfig
} from '@kcuf/fetcher-core';

export interface IFetcherConfig extends FetcherConfig, JsonpOptions {}
