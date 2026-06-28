import {
  IFetcherConfigQuick,
  TFetcherArgsJsonp,
  TFetcherArgsGet,
  TFetcherParams
} from '../types';

export default function parseArgsGet<P extends TFetcherParams>(args: TFetcherArgsJsonp<P> | TFetcherArgsGet<P>): [IFetcherConfigQuick | undefined, url: string, P?] {
  let config: IFetcherConfigQuick | undefined;
  let url: string;
  let params: P | undefined;
  
  if (typeof args[0] === 'string') {
    [url, params] = args as [string, P?];
  } else {
    [config, url, params] = args as [IFetcherConfigQuick, string, P?];
  }
  
  return [config, url, params];
}
