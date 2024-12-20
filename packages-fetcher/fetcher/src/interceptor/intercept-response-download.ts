import {
  downloadBlob,
  downloadArrayBuffer
} from '@kcuf/fetcher-helper-file';

import {
  EResponseType
} from '../enum';
import {
  IFetcherConfig,
  IFetcherResponse
} from '../types';
import {
  parseFilenameFromResponseHeaders
} from '../util';

export default function interceptResponseDownload(o: unknown, config: IFetcherConfig, fetcherResponse?: IFetcherResponse): unknown {
  if (!o) {
    return o;
  }
  
  if (o instanceof Blob && config.responseType === EResponseType.BLOB_DOWNLOAD) {
    downloadBlob(o, config.downloadName || parseFilenameFromResponseHeaders(fetcherResponse?.headers));
  }
  
  if (o instanceof ArrayBuffer && config.responseType === EResponseType.ARRAY_BUFFER_DOWNLOAD) {
    downloadArrayBuffer(o, config.downloadName || parseFilenameFromResponseHeaders(fetcherResponse?.headers));
  }
  
  return o;
}
