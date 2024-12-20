import {
  FetcherConfig,
  FetcherInterceptResponseFulfilled,
  cloneResponseData
} from '@kcuf/fetcher';

import parseMergingOptions from './parse-merging-options';
import mergingResolve from './merging-resolve';

export default function createInterceptorResponseFulfilled(): FetcherInterceptResponseFulfilled {
  return (data: unknown, config: FetcherConfig): unknown => {
    const merging = parseMergingOptions(config);
    
    if (merging) {
      mergingResolve(merging.key, data);
    }
    
    return cloneResponseData(data); // 避免第一个请求对 data 做了 mutation 而影响到后续的结果
  };
}
