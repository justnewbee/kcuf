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
  getDownloadFilename
} from '../util';

export default function interceptResponseDownload(o: unknown, config: IFetcherConfig, fetcherResponse?: IFetcherResponse): unknown {
  if (!o) {
    return o;
  }
  
  if (o instanceof Blob && config.responseType === EFetcherResponseType.BLOB_DOWNLOAD) {
    downloadBlob(o, getDownloadFilename(config, fetcherResponse));
  }
  
  if (o instanceof ArrayBuffer && config.responseType === EFetcherResponseType.ARRAY_BUFFER_DOWNLOAD) {
    downloadArrayBuffer(o, getDownloadFilename(config, fetcherResponse));
  }
  
  return o;
}
