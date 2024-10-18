import {
  IFetcherConfig
} from '../types';
import {
  isCors,
  isJsonp
} from '../util';

/**
 * request 最后一个拦截器，写入 _timeStarted，如果不是 JSONP，对 headers 和 credentials 做补充
 */
export default function interceptRequestFinal(fetcherConfig: IFetcherConfig): Partial<IFetcherConfig> {
  const config: IFetcherConfig = {
    _timeStarted: Date.now() // 开始请求的时间
  };
  
  if (isJsonp(fetcherConfig)) {
    return config;
  }
  
  config.credentials = fetcherConfig.credentials || (isCors(fetcherConfig) ? 'include' : 'same-origin'); // MUST
  
  return config;
}
