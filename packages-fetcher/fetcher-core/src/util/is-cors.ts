import {
  IFetcherConfig
} from '../types';

import extractProtocolHost from './extract-protocol-host';

/**
 * 测试最终请求是否跨域
 */
export default function isCors(config: IFetcherConfig): boolean {
  const protocolHost = extractProtocolHost(config);
  
  if (!protocolHost) {
    return false;
  }
  
  const {
    location: {
      protocol,
      host
    }
  } = window;
  
  return protocolHost[1] !== host || (!!protocolHost[0] && protocolHost[0] !== protocol);
}
