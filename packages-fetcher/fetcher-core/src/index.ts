export { default } from './factory';
export * from './helper';

export {
  EFetcherErrorName as FetcherErrorName,
  EFetcherResponseType as FetcherResponseType
} from './enum';

export type {
  IFetcher as Fetcher,
  // config
  IFetcherConfig as FetcherConfig,
  IFetcherConfigDefault as FetcherConfigDefault,
  IFetcherConfigQuickJsonp as FetcherConfigQuickJsonp,
  IFetcherConfigQuick as FetcherConfigQuick,
  TFetcherHeadersNormalized as FetcherHeadersNormalized,
  TFetcherBodyNormalized as FetcherBodyNormalized,
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
