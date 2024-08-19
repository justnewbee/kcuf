import {
  IFetcherFnGetAlike,
  IFetcherFnJsonp,
  IFetcherFnPostAlike
} from './fn';
import {
  IFetcherClass
} from './class';

export interface IFetcher extends Pick<IFetcherClass, 'interceptRequest' | 'interceptResponse' | 'sealInterceptors' | 'request'> {
  jsonp: IFetcherFnJsonp;
  get: IFetcherFnGetAlike;
  post: IFetcherFnPostAlike;
  put: IFetcherFnPostAlike;
  patch: IFetcherFnPostAlike;
  delete: IFetcherFnPostAlike;
}