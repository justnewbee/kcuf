import {
  IFetcherConfig,
  TFetcherBody
} from '../types';

import {
  deserializeBody
} from './serialize-body';
import mergeBody from './merge-body';

export default function mergeConfigBody(config: IFetcherConfig, body?: TFetcherBody): void {
  if (!body) {
    return;
  }
  
  /*
   * 不需要或无法合并的场景：
   *
   * - config.body 为空
   * - config.body / body 其中之一是 string
   * - config.body / body 其中之一是 Blob
   */
  if (!config.body || config.body instanceof Blob || body instanceof Blob) {
    config.body = body;
    
    return;
  }
  
  config.body = mergeBody(
      typeof config.body === 'string' ? deserializeBody(config.body, config.serializeBody) : config.body,
      typeof body === 'string' ? deserializeBody(body, config.serializeBody) : body
  );
}
