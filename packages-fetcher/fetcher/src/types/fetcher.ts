import {
  IFetcherCallGetAlike,
  IFetcherCallJsonp,
  IFetcherCallPostAlike
} from './config';
import {
  IFetcherClassType
} from './class';

export interface IFetcher extends Pick<IFetcherClassType, 'interceptRequest' | 'interceptResponse' | 'sealInterceptors' | 'request'> {
  jsonp: IFetcherCallJsonp;
  get: IFetcherCallGetAlike;
  post: IFetcherCallPostAlike;
  put: IFetcherCallPostAlike;
  patch: IFetcherCallPostAlike;
  delete: IFetcherCallPostAlike;
}