import {
  FetcherConfig,
  FetcherInterceptRequest,
  FetcherInterceptRequestReturn,
  createFetcherErrorSkipNetwork
} from '@kcuf/fetcher';

import parseMergingOptions from './parse-merging-options';
import mergingGet from './merging-get';
import mergingAdd from './merging-add';

export default function createInterceptorRequest(): FetcherInterceptRequest {
  return (fetcherConfig: FetcherConfig): FetcherInterceptRequestReturn => {
    const merging = parseMergingOptions(fetcherConfig);
    
    // 不需要，直接跳过，将继续请求
    if (!merging) {
      return;
    }
    
    const {
      key
    } = merging;
    const queue = mergingGet(key);
    
    // 第 0 个请求还在请求中，则附之
    if (queue) {
      const promise = new Promise((resolve, reject) => queue.push({
        resolve,
        reject
      }));
      
      throw createFetcherErrorSkipNetwork(promise, fetcherConfig);
    } else {
      mergingAdd(key);
    }
  };
}
