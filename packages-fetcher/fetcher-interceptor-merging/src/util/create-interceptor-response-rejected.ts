import {
  FetcherConfig,
  FetcherError,
  FetcherInterceptResponseRejected
} from '@kcuf/fetcher';

import parseMergingOptions from './parse-merging-options';
import mergingReject from './merging-reject';

export default function createInterceptorResponseRejected(): FetcherInterceptResponseRejected {
  return (err: FetcherError, fetcherConfig: FetcherConfig): void => {
    const merging = parseMergingOptions(fetcherConfig);
    
    if (merging) {
      mergingReject(merging.key, err);
    }
    
    throw err;
  };
}
