import {
  IFetcherClass,
  TFetcherBody,
  TFetcherParams,
  TFetcherArgsPost,
  IFetcherFnPost
} from '../types';
import {
  mergeConfig, parseArgsPost
} from '../util';

export default function createFnPost(fetcher: IFetcherClass, method: 'POST' | 'PUT' | 'PATCH' | 'DELETE'): IFetcherFnPost {
  return <T, B extends TFetcherBody, P extends TFetcherParams>(...args: TFetcherArgsPost<B, P>): Promise<T> => {
    const [config, url, body, params] = parseArgsPost(args);
    
    return fetcher.request<T>(mergeConfig(config, {
      url,
      method,
      params,
      body
    }));
  };
}
