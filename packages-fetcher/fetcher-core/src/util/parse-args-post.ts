import {
  TFetcherConfigQuick,
  TFetcherArgsPost,
  TFetcherBody,
  TFetcherParams
} from '../types';

export default function parseArgsPost<B extends TFetcherBody, P extends TFetcherParams>(args: TFetcherArgsPost<B, P>): [TFetcherConfigQuick | undefined, string, B, P] {
  let config: TFetcherConfigQuick | undefined;
  let url: string;
  let body: B | undefined;
  let params: P | undefined;
  
  if (typeof args[0] === 'string') {
    [url, body, params] = args as [string, B, P];
  } else {
    [config, url, body, params] = args as [TFetcherConfigQuick, string, B, P];
  }
  
  return [config, url, body, params];
}
