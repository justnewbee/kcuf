import {
  FetcherConfig,
  FetcherError,
  FetcherInterceptResponseRejected
} from '@kcuf/fetcher';

import parseMergingOptions from './parse-merging-options';
import mergingReject from './merging-reject';

export default function createInterceptorResponseRejected(): FetcherInterceptResponseRejected {
  return (err: FetcherError, config: FetcherConfig): void => {
    const merging = parseMergingOptions(config);
    
    if (merging) {
      mergingReject(merging.key, err);
    }
    
    throw err;
  };
}
