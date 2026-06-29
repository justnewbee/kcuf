import {
  TFetcherHeadersFallbackNormalized
} from './config-headers';

/**
 * 将 fetch 和 jsonp 各自的 response 同化后的类型，剔除 fetch Response 中不关心的部分（body、bodyUsed、ok、
 * redirected、status、statusText、type 等），提取 `.json()` 后 resolve 的数据
 */
export interface IFetcherResponse<T = unknown> {
  readonly url: string;
  readonly headers: Headers | TFetcherHeadersFallbackNormalized;
  readonly data: T;
}
