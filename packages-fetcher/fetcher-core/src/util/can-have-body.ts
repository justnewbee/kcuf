import {
  IFetcherConfig
} from '../types';

const REG_METHODS_CAN_NOT_HAVE_BODY = /^(GET|HEAD|JSONP)$/i;

/**
 * method 对应的请求是否可以包含 body
 */
export default function canHaveBody(config: IFetcherConfig): boolean {
  return !REG_METHODS_CAN_NOT_HAVE_BODY.test(config.method || 'GET');
}
