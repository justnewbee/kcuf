import {
  IFetcherFnGetAlike,
  IFetcherFnJsonp,
  IFetcherFnPostAlike
} from './fn';
import {
  IFetcherClassType
} from './class';

export interface IFetcher extends Pick<IFetcherClassType, 'interceptRequest' | 'interceptResponse' | 'sealInterceptors' | 'request'> {
  jsonp: IFetcherFnJsonp;
  get: IFetcherFnGetAlike;
  post: IFetcherFnPostAlike;
  put: IFetcherFnPostAlike;
  patch: IFetcherFnPostAlike;
  delete: IFetcherFnPostAlike;
}