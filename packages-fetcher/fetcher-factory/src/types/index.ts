import {
  Fetcher,
  FetcherHeaders,
  FetcherConfig
} from '@kcuf/fetcher';
import {
  FetcherInterceptorBizOptions,
  FetcherConfigBiz
} from '@kcuf/fetcher-interceptor-biz';
import {
  FetcherConfigCacheLocal
} from '@kcuf/fetcher-interceptor-cache-local';
// import {
//   FetcherConfigMerging
// } from '@kcuf/fetcher-interceptor-merging';
import {
  FetcherInterceptorSlsOptions
} from '@kcuf/fetcher-interceptor-sls';
import {
  FetcherInterceptorLoginOptions
} from '@kcuf/fetcher-interceptor-login';

export type TUrlBase = string | (() => string); // 给 urlBase 提供一定的动态能力

export interface IFetcherFactoryOptions {
  urlBase?: TUrlBase;
  getHeaders?(): FetcherHeaders;
  interceptorBizOptions?: FetcherInterceptorBizOptions;
  interceptorSlsOptions?: FetcherInterceptorSlsOptions;
  interceptorLoginOptions?: FetcherInterceptorLoginOptions;
}

export interface IFetcherSseFactoryOptions {
  urlBase?: TUrlBase;
  getHeaders?(): Record<string, string>;
}

export interface IFetcherConfigX extends FetcherConfigBiz, FetcherConfigCacheLocal {}

export interface IFetcherConfigAugmented extends FetcherConfig, IFetcherConfigX {}

export type TFetcher = Fetcher<IFetcherConfigX>;
