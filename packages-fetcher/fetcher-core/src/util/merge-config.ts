import _forEach from 'lodash/forEach';

import {
  IFetcherConfig,
  TFetcherBody,
  TFetcherHeaders,
  TFetcherParams
} from '../types';

import mergeConfigHeaders from './merge-config-headers';
import mergeConfigParams from './merge-config-params';
import mergeConfigBody from './merge-config-body';

/**
 * 将多个 FetcherConfig 进行合并
 */
export default function mergeConfig(config1: IFetcherConfig | undefined, config2: IFetcherConfig | undefined): IFetcherConfig {
  const merged: IFetcherConfig = {};
  
  [config1, config2].forEach(partialConfig => {
    _forEach(partialConfig, (v, k) => {
      if (v === undefined) {
        return;
      }
      
      switch (k as keyof IFetcherConfig) {
      case 'headers': // headers 合并
        mergeConfigHeaders(merged, v as TFetcherHeaders);
        
        break;
      case 'params': // 参数合并
        mergeConfigParams(merged, v as TFetcherParams);
        
        break;
      case 'body': // body 合并
        mergeConfigBody(merged, v as TFetcherBody);
        
        break;
      default: // 其他，替换
        (merged as Record<string, unknown>)[k] = v;
        
        break;
      }
    });
  });
  
  return merged;
}
