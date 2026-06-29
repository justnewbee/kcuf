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
  isInstanceofBlob,
  isInstanceofArrayBuffer,
  getDownloadFilename
} from '../util';

export default function interceptResponseDownload(o: unknown, config: IFetcherConfig, fetcherResponse?: IFetcherResponse): unknown {
  if (!o) {
    return o;
  }
  
  if (isInstanceofBlob(o) && config.responseType === EFetcherResponseType.BLOB_DOWNLOAD) {
    downloadBlob(o, getDownloadFilename(config, fetcherResponse));
  }
  
  if (isInstanceofArrayBuffer(o) && config.responseType === EFetcherResponseType.ARRAY_BUFFER_DOWNLOAD) {
    downloadArrayBuffer(o, getDownloadFilename(config, fetcherResponse));
  }
  
  return o;
}
