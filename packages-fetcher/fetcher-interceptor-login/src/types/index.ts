import {
  FetcherError
} from '@kcuf/fetcher';

export interface ICreateInterceptorOptions {
  needLogin(code: string, err: FetcherError): boolean;
  doLogin(): Promise<void>;
  headerKeys?: string[];
}
