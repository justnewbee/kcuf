import _forEach from 'lodash/forEach';

import {
  IFetcherConfig,
  TFetcherBody,
  TFetcherHeaders,
  TFetcherParams
} from '../types';

import normalizeHeaders from './normalize-headers';
import mergeConfigHeaders from './merge-config-headers';
import mergeConfigParams from './merge-config-params';
import mergeConfigBody from './merge-config-body';

/**
 * 将多个 FetcherConfig 进行合并
 */
export default function mergeConfig(...args: (IFetcherConfig | undefined)[]): IFetcherConfig {
  const finalConfig: IFetcherConfig = {};
  
  finalConfig.headers = normalizeHeaders(finalConfig.headers);
  
  args.forEach(partialConfig => {
    _forEach(partialConfig, (v, k) => {
      if (v === undefined) {
        return;
      }
      
      switch (k as keyof IFetcherConfig) {
        case 'headers': // headers 合并
          mergeConfigHeaders(finalConfig, v as TFetcherHeaders);
          
          break;
        case 'params': // 参数合并
          mergeConfigParams(finalConfig, v as TFetcherParams);
          
          break;
        case 'body': // body 合并
          mergeConfigBody(finalConfig, v as TFetcherBody);
          
          break;
        default: // 其他，替换
          (finalConfig as Record<string, unknown>)[k] = v;
          
          break;
      }
    });
  });
  
  return finalConfig;
}
