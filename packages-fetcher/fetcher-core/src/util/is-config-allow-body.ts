import {
  IFetcherConfig
} from '../types';

const REG_METHODS_ALLOW_BODY = /^(POST|PUT|PATCH|DELETE)$/i;

/**
 * 是否可以包含 body
 */
export default function isConfigAllowBody(config: IFetcherConfig): boolean {
  return REG_METHODS_ALLOW_BODY.test(config.method ?? 'GET');
}
