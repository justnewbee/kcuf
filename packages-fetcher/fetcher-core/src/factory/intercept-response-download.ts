import {
  downloadBlob,
  downloadArrayBuffer
} from '@kcuf/fetcher-helper-file';

import {
  EFetcherResponseType
} from '../enum';
import {
  IFetcherConfig,
  IFetcherResponse
} from '../types';
import {
  getFilenameFromResponseHeaders
} from '../util';

export default function interceptResponseDownload(o: unknown, config: IFetcherConfig, fetcherResponse?: IFetcherResponse): unknown {
  if (!o) {
    return o;
  }
  
  if (o instanceof Blob && config.responseType === EFetcherResponseType.BLOB_DOWNLOAD) {
    downloadBlob(o, config.downloadName || getFilenameFromResponseHeaders(fetcherResponse));
  }
  
  if (o instanceof ArrayBuffer && config.responseType === EFetcherResponseType.ARRAY_BUFFER_DOWNLOAD) {
    downloadArrayBuffer(o, config.downloadName || getFilenameFromResponseHeaders(fetcherResponse));
  }
  
  return o;
}
