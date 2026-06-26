import {
  IFetcherConfig
} from '../types';

import getUrlOrigin from './get-url-origin';

export default function isConfigCors(config: IFetcherConfig): boolean {
  if (typeof location === 'undefined') {
    return true;
  }
  
  return (getUrlOrigin(config.url) || getUrlOrigin(config.urlBase)) !== location.origin;
}
