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
  IFetcherFnRequest as FetcherFnRequest,
  IFetcherFnJsonp as FetcherFnJsonp,
  IFetcherFnGetAlike as FetcherFnGet,
  IFetcherFnPostAlike as FetcherFnPost,
  IFetcherOptionsForQuickJsonp as FetcherOptionsForQuickJsonp,
  IFetcherOptionsForQuickFn as FetcherOptionsForQuickGet,
  IFetcherOptionsForQuickFn as FetcherOptionsForQuickPost,
  TFetcherInterceptRequestReturn as FetcherInterceptRequestReturn,
  IFetcherInterceptorRequest as FetcherFnInterceptRequest,
  IFetcherInterceptorResponseFulfilled as FetcherFnInterceptResponseFulfilled,
  IFetcherInterceptorResponseRejected as FetcherFnInterceptResponseRejected,
  IBuildUrlOptions as FetcherBuildUrlOptions
} from './types';
