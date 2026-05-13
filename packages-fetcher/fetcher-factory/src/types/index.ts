import {
  FetcherInterceptorSlsOptions
} from '@kcuf/fetcher-interceptor-sls';

export type TUrlBase = string | (() => string); // 给 urlBase 提供一定的动态能力

export interface IFetcherFactoryOptions {
  urlBase?: TUrlBase;
  getHeaders?(): Record<string, string>;
  isSuccess?(o: Record<string, unknown>): boolean;
  getMessage?(o: Record<string, unknown>): string;
  slsOptions?: FetcherInterceptorSlsOptions;
}

export interface IFetcherSseFactoryOptions {
  urlBase?: TUrlBase;
  getHeaders?(): Record<string, string>;
}
