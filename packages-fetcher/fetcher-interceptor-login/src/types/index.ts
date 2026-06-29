import {
  FetcherError
} from '@kcuf/fetcher-core';

export interface IFetcherInterceptorLoginOptions {
  needLogin(code: string, err: FetcherError): boolean;
  doLogin(): Promise<unknown>;
  headerKeys?: string[];
}
