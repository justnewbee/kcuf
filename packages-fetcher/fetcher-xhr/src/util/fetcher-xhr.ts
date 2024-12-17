import {
  IXhrOptions,
  IXhrResponse
} from '../types';

import createResponse from './create-response';
import createErrorTimeout from './create-error-timeout';
import createErrorAbort from './create-error-abort';
import createErrorNetwork from './create-error-network';

export default function fetcherXhr<T = unknown>(url: string, options: IXhrOptions = {}): Promise<IXhrResponse<T>> {
  const {
    method = 'GET',
    timeout = 0,
    signal,
    headers,
    body,
    onProgress = null
  } = options;
  
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.open(method, url, true);
    
    if (timeout > 0) {
      xhr.timeout = timeout;
    }
    
    if (headers) {
      if (headers instanceof Headers) {
        headers.forEach((v, k) => {
          xhr.setRequestHeader(k, v);
        });
      } else if (Array.isArray(headers)) {
        headers.forEach(([k, v]) => xhr.setRequestHeader(k, v));
      } else {
        Object.keys(headers).forEach(v => {
          xhr.setRequestHeader(v, String(headers[v]));
        });
      }
    }
    
    // https://developer.mozilla.org/en-US/docs/Web/API/AbortController
    if (signal) {
      signal.addEventListener('abort', () => xhr.abort());
    }
    
    if (onProgress) {
      xhr.upload.onprogress = e => {
        if (e.lengthComputable) {
          onProgress(e.loaded / e.total);
        }
      };
    }
    
    xhr.onload = () => resolve(createResponse(xhr, url));
    xhr.onerror = () => reject(createErrorNetwork(url));
    xhr.ontimeout = () => reject(createErrorTimeout(url, timeout));
    xhr.onabort = () => reject(createErrorAbort(url));
    
    xhr.send(body);
  });
}
