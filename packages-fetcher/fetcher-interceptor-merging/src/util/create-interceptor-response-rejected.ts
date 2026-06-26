import {
  FetcherError,
  FetcherInterceptResponseRejected
} from '@kcuf/fetcher-core';

import {
  IFetcherConfigAugmentedMerging
} from '../types';

import parseMergingOptions from './parse-merging-options';
import mergingReject from './merging-reject';

export default function createInterceptorResponseRejected(): FetcherInterceptResponseRejected {
  return (err: FetcherError, config: IFetcherConfigAugmentedMerging): void => {
    const merging = parseMergingOptions(config);
    
    if (merging) {
      mergingReject(merging.key, err);
    }
    
    throw err;
  };
}
