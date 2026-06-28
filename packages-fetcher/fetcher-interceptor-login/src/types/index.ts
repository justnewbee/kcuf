import {
  FetcherError
} from '@kcuf/fetcher-core';

export interface IInterceptLoginOptions {
  needLogin(code: string, err: FetcherError): boolean;
  doLogin(): Promise<unknown>;
  headerKeys?: string[];
}
