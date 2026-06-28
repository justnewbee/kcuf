import {
  IFetcherConfigQuick,
  TFetcherArgsPost,
  TFetcherBody,
  TFetcherParams
} from '../types';

export default function parseArgsPost<B extends TFetcherBody, P extends TFetcherParams>(args: TFetcherArgsPost<B, P>): [IFetcherConfigQuick | undefined, string, B, P] {
  let config: IFetcherConfigQuick | undefined;
  let url: string;
  let body: B | undefined;
  let params: P | undefined;
  
  if (typeof args[0] === 'string') {
    [url, body, params] = args as [string, B, P];
  } else {
    [config, url, body, params] = args as [IFetcherConfigQuick, string, B, P];
  }
  
  return [config, url, body, params];
}
