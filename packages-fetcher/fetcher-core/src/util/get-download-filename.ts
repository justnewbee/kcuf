import {
  IFetcherConfig,
  IFetcherResponse
} from '../types';

import isInstanceofHeaders from './is-instanceof-headers';
import headersNormalize from './headers-normalize';
import headersGet from './headers-get';

export default function getDownloadFilename(config: IFetcherConfig, fetcherResponse?: IFetcherResponse): string {
  if (config.downloadName) {
    return config.downloadName;
  }
  
  const disposition = headersGet(isInstanceofHeaders(fetcherResponse?.headers) ? fetcherResponse.headers : headersNormalize(fetcherResponse?.headers), 'Content-Disposition'); // attachment;filename=...
  const matches = disposition?.match(/attachment;filename=([^;\n]+)/);
  
  return decodeURIComponent(matches?.[1] || '') || 'download';
}
