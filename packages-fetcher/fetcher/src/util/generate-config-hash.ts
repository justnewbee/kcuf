import {
  md5Json
} from '@kcuf/md5';

import {
  IFetcherConfig
} from '../types';

import buildUrl from './build-url';

/**
 * 根据 config 中的相关数据创建 Hash，可用于判断两个请求是否等价，带上 URL 是为了能够更具辨识度，且能够允许移除
 */
export default function generateConfigHash(config: IFetcherConfig): string {
  const {
    method,
    url = '',
    urlBase,
    params,
    body
  } = config;
  
  return `${buildUrl({ // 不直接传整个 `fetcherConfig`，且不传 `params`
    url,
    urlBase,
    urlCacheBusting: false
  })}!${md5Json({
    method,
    params,
    body
  })}`;
}
