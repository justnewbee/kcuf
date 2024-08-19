import {
  FetcherConfig
} from '@kcuf/fetcher';

import {
  IMergingOptionsParsed
} from '../types';

export default function parseMergingOptions(fetcherConfig: FetcherConfig): IMergingOptionsParsed | null {
  const {
    _id,
    signal,
    merging = true
  } = fetcherConfig;
  
  if (!merging || signal) { // 有 AbortSignal 则不可用 merge
    return null;
  }
  
  const {
    key = ''
  } = merging ? {} : merging;
  
  return {
    key: key || _id!
  };
}
