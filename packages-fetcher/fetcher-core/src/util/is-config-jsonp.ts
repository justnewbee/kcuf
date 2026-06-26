import {
  IFetcherConfig
} from '../types';

const REG_JSONP = /^JSONP$/i;

export default function isConfigJsonp(config: IFetcherConfig): boolean {
  return !!config.method && REG_JSONP.test(config.method);
}
