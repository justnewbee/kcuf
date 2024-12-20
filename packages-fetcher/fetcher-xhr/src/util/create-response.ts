import {
  IXhrResponse
} from '../types';

import parseResponseHeaders from './parse-xhr-response-headers';

export default function createResponse<T>(xhr: XMLHttpRequest, url: string): IXhrResponse<T> {
  const {
    status,
    responseText
  } = xhr;
  
  return {
    ok: status >= 200 && status < 300,
    url,
    status,
    headers: parseResponseHeaders(xhr.getAllResponseHeaders()),
    json: (): Promise<T> => Promise.resolve(JSON.parse(responseText) as T),
    text: (): Promise<string> => Promise.resolve(responseText),
    blob: (): Promise<null> => Promise.resolve(null),
    arrayBuffer: (): Promise<null> => Promise.resolve(null)
  };
}
