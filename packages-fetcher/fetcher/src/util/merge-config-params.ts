import {
  IFetcherConfig,
  TFetcherParams
} from '../types';

import {
  deserializeParams
} from './serialize-params';
import mergeParams from './merge-params';

export default function mergeConfigParams(config: IFetcherConfig, params?: TFetcherParams): void {
  if (!params) {
    return;
  }
  
  /*
   * 不需要或无法合并的场景：
   *
   * - config.params 为空
   */
  if (!config.params) {
    config.params = params;
    
    return;
  }
  
  config.params = mergeParams(
      typeof config.params === 'string' ? deserializeParams(config.params, config.serializeParams) : config.params,
      typeof params === 'string' ? deserializeParams(params, config.serializeParams) : params
  );
}
