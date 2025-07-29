import {
  IFetcherConfig
} from '../types';
import {
  isCors,
  isJsonp
} from '../util';

/**
 * Request 最后一个拦截器，发送请求前一刻执行
 */
export default function interceptRequestFinal(config: IFetcherConfig): Partial<IFetcherConfig> {
  const configMix: IFetcherConfig = {
    _timeStarted: Date.now() // 开始请求的时间
  };
  
  if (config.urlCacheBusting) {
    configMix.params = {
      _cache_busting_: Date.now()
    };
  }
  
  if (isJsonp(config)) {
    return configMix;
  }
  
  configMix.credentials = config.credentials ?? (isCors(config) ? 'include' : 'same-origin'); // MUST
  
  return configMix;
}
