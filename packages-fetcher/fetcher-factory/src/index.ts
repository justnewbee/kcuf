export { default } from './fetcher-factory';
export { default as fetcherSseFactory } from './fetcher-sse-factory';

export * from '@kcuf/fetcher'; // eslint-disable-line import/export
export * from '@kcuf/fetch-sse';

export type {
  IFetcherFactoryOptions as FetcherFactoryOptions,
  IFetcherConfigAugmented as FetcherConfig, // eslint-disable-line import/export
  TFetcher as Fetcher // eslint-disable-line import/export
} from './types';
