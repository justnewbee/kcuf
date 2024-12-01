import {
  IFetcherConfig
} from '../types';

/**
 * Fetcher 遵循传入值的优先级高于拦截器注入，因此在利用 headers 进行登录判断的情况下，若利用拦截器进行二次调用，
 * 可能会让前一次拦截器的结果成为后一次的「传入值」，从而导致新的从拦截器进入的值无法生效，可用此帮助方法清空前一次
 * 的结果
 */
export default function deleteConfigHeaders(config: IFetcherConfig, keys: string[]): void {
  const {
    headers
  } = config;
  
  if (!headers) {
    return;
  }
  
  if (headers instanceof Headers) {
    keys.forEach(v => {
      headers.delete(v);
    });
  } else {
    keys.forEach(v => delete headers[v]); // eslint-disable-line @typescript-eslint/no-dynamic-delete
  }
}
