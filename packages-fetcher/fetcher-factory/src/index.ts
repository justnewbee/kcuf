export { default } from './fetcher-factory';
export { default as fetcherSseFactory } from './fetcher-sse-factory';

// 输出可选的拦截器，以便在应用顶层额外设置
export { default as interceptHeaders } from '@kcuf/fetcher-interceptor-headers';
export { default as interceptSls } from '@kcuf/fetcher-interceptor-sls';
export { default as interceptLogin } from '@kcuf/fetcher-interceptor-login';

export * from '@kcuf/fetcher'; // eslint-disable-line import/export
export * from '@kcuf/fetch-sse';

export type {
  IFetcherFactoryOptions as FetcherFactoryOptions,
  IFetcherConfigAugmented as FetcherConfig, // eslint-disable-line import/export
  TFetcher as Fetcher // eslint-disable-line import/export
} from './types';
