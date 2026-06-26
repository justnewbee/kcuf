import createFetcher from './factory';

const fetcher = createFetcher();

fetcher.sealInterceptors();

export default fetcher;

export {
  EFetcherErrorName as FetcherErrorName
} from './enum';
export * from './helper';

export {
  createFetcher
};

export type {
  IFetcher as Fetcher,
  IFetcherConfig as FetcherConfig,
  IFetcherResponse as FetcherResponse,
  IFetcherError as FetcherError,
  TFetcherCallRequest as FetcherCallRequest,
  IFetcherCallJsonp as FetcherCallJsonp,
  IFetcherCallGetAlike as FetcherCallGet,
  IFetcherCallPostAlike as FetcherCallPost,
  IFetcherConfigQuickJsonp as FetcherConfigQuickJsonp,
  IFetcherConfigQuick as FetcherConfigQuick,
  TFetcherInterceptRequest as FetcherInterceptRequest,
  TFetcherInterceptRequestReturn as FetcherInterceptRequestReturn,
  TFetcherInterceptResponseFulfilled as FetcherInterceptResponseFulfilled,
  TFetcherInterceptResponseRejected as FetcherInterceptResponseRejected,
  IBuildUrlOptions as FetcherBuildUrlOptions
} from './types';
