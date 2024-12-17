import {
  IJsonpResponse
} from '../types';

export default function createResponse<T>(result: unknown, url: string): IJsonpResponse<T> {
  return {
    ok: true,
    status: 200,
    url,
    json: (): Promise<T> => {
      if (typeof result === 'string') {
        return Promise.resolve(JSON.parse(result) as T);
      }
      
      return Promise.resolve(result as T);
    },
    text: (): Promise<string> => {
      if (result && typeof result === 'object') {
        return Promise.resolve(JSON.stringify(result));
      }
      
      return Promise.resolve(result as string);
    }
  };
}
