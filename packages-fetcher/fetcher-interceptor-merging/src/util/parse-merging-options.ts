import {
  FetcherConfig
} from '@kcuf/fetcher';

import {
  IMergingOptionsParsed
} from '../types';

/**
 * 不进行合并的原因：
 *
 * 1. 显式传入 `merging: false`
 * 2. 传入 AbortController 的 signal
 * 3. 由拦截器发起的请求（否则像登录后重新发起的请求也进入了 merging，就会一直 pending）
 */
export default function parseMergingOptions(config: FetcherConfig): IMergingOptionsParsed | null {
  const {
    merging = true
  } = config;
  
  return config._byInterceptor || config.signal || !merging ? null : {
    key: config._hash! // eslint-disable-line @typescript-eslint/no-non-null-assertion
  };
}
