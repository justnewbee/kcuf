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
import {
  Fetcher,
  FetcherConfig
} from '@kcuf/fetcher';

export type TUrlBase = string | (() => string); // 给 urlBase 提供一定的动态能力

export interface IFetcherFactoryOptions {
  urlBase?: TUrlBase;
  getHeaders?(): Record<string, string>;
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
