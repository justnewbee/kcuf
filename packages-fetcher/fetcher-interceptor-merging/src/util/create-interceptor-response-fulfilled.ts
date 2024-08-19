import {
  cloneDeep as _cloneDeep
} from 'lodash-es';

import {
  FetcherConfig,
  FetcherFnInterceptResponseFulfilled
} from '@kcuf/fetcher';

import parseMergingOptions from './parse-merging-options';
import mergingResolve from './merging-resolve';

export default function createInterceptorResponseFulfilled(): FetcherFnInterceptResponseFulfilled {
  return (data: unknown, fetcherConfig: FetcherConfig): unknown => {
    const merging = parseMergingOptions(fetcherConfig);
    
    if (merging) {
      mergingResolve(merging.key, data);
    }
    
    return _cloneDeep(data); // 避免第一个请求对 data 做了 mutation 而影响到后续的结果
  };
}
