import {
  IFetcherOptionsForQuickFn,
  IFetcherOptionsForQuickJsonp
} from './options';

export type TArgsForJsonp<P = void> = [string, P?] | [IFetcherOptionsForQuickJsonp, string, P?];
export type TArgsForGet<P = void> = [string, P?] | [IFetcherOptionsForQuickFn, string, P?];
export type TArgsForPost<B = void, P = void> = [string, B?, P?] | [IFetcherOptionsForQuickFn, string, B?, P?];
