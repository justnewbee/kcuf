import {
  IXhrResponse
} from '../types';

export default function createResponse<T>(responseStatus: number, responseText: string, url: string): IXhrResponse<T> {
  return {
    ok: responseStatus >= 200 && responseStatus < 300,
    url,
    status: responseStatus,
    json: (): Promise<T> => {
      return Promise.resolve(JSON.parse(responseText) as T);
    },
    text: (): Promise<string> => {
      return Promise.resolve(responseText);
    }
  };
}
