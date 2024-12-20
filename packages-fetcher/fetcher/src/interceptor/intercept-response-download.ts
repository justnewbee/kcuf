import {
  IFetcherConfig,
  IFetcherResponse
} from '../types';
import {
  downloadBlob,
  parseFilenameFromResponseHeaders
} from '../util';

export default function interceptResponseDownload(o: unknown, config: IFetcherConfig, fetcherResponse?: IFetcherResponse): unknown {
  if (o && o instanceof Blob && config.responseType === 'download') {
    downloadBlob(o, parseFilenameFromResponseHeaders(fetcherResponse?.headers) || 'download');
  }
  
  return o;
}
