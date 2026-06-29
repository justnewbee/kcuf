export { default } from './factory';
export * from './helper';

export {
  EFetcherErrorName as FetcherErrorName,
  EFetcherResponseType as FetcherResponseType
} from './enum';

export type {
  IFetcher as Fetcher,
  // common
  TFetcherHeadersNormalized as FetcherHeadersNormalized,
  TFetcherBodyNormalized as FetcherBodyNormalized,
  // config
  IFetcherConfig as FetcherConfig,
  IFetcherConfigDefault as FetcherConfigDefault,
  TFetcherConfigQuickJsonp as FetcherConfigQuickJsonp,
  TFetcherConfigQuick as FetcherConfigQuick,
  // method
  TFetcherFnRequest as FetcherCallRequest,
  IFetcherFnJsonp as FetcherCallJsonp,
  IFetcherFnGet as FetcherCallGet,
  IFetcherFnPost as FetcherCallPost,
  // interceptor
  TFetcherInterceptRequest as FetcherInterceptRequest,
  TFetcherInterceptRequestReturn as FetcherInterceptRequestReturn,
  TFetcherInterceptResponseFulfilled as FetcherInterceptResponseFulfilled,
  TFetcherInterceptResponseRejected as FetcherInterceptResponseRejected,
  // response & error
  IFetcherResponse as FetcherResponse,
  IFetcherError as FetcherError
} from './types';
