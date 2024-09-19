import {
  FetcherConfig
} from '@kcuf/fetcher';

import {
  IMergingOptionsParsed
} from '../types';

export default function parseMergingOptions(fetcherConfig: FetcherConfig): IMergingOptionsParsed | null {
  const {
    signal,
    merging = true
  } = fetcherConfig;
  
  return !merging || signal ? null : { // 有 AbortSignal 则不可用 merge
    key: fetcherConfig._id! // eslint-disable-line @typescript-eslint/no-non-null-assertion
  };
}
