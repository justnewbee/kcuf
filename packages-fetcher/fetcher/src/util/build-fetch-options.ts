import {
  FetchOptions
} from '@kcuf/fetcher-fetch';

import {
  IFetcherConfig
} from '../types';

import canHaveBody from './can-have-body';
import serializeBody from './serialize-body';

/**
 * 主要处理 headers 和 body 信息。
 *
 * 如果 fetch 对 GET/HEAD 请求传入 body，哪怕只是一个空字符串，
 * 浏览器就会直接拒绝并报错「HEAD or GET Request cannot have a body.」
 *
 *  当 `request.headers['Content-Type']` 不存在时，会自动设置 `Content-Type` 的：
 *
 * ### URLSearchParams
 *
 * 自动设置 `Content-Type` 为 `application/x-www-form-urlencoded;charset=UTF-8`，其他类型虽能发送，但可能没什么用
 *
 * → 删除 `headers` 中可能有的 `Content-Type`
 *
 * ```js
 * fetch('/URLSearchParams', {
 *   method: 'POST',
 *   body: new URLSearchParams({ a, 1, b: 2 })
 * });
 * ```
 *
 * ### FormData
 *
 * 自动设置 `Content-Type` 为 `multipart/form-data; boundary---...`，其他类型浏览器会拒绝，因此需要踢掉设置的值
 *
 * → 删除 `headers` 中可能有的 `Content-Type`
 *
 * ```js
 * fetch('/FormData', {
 *   method: 'POST',
 *   body: new FormData()
 * });
 * ```
 *
 * ### Blob
 *
 * 跟 `new Blob(['...'], { type: 'text/plain' })` 的 `type` 有关
 *
 * → 删除 `headers` 中可能有的 `Content-Type`
 *
 * ```js
 * fetch('/Blob', {
 *   method: 'POST',
 *   body: new Blob(['hello'], { type: 'text/plain' })
 * });
 *
 * fetch('/Blob', {
 *   method: 'POST',
 *   body: new Blob(['{"hello": "world"}'], { type: 'application/json' })
 * });
 * ```
 */
export default function buildFetchOptions(fetcherConfig: IFetcherConfig): FetchOptions {
  const {
    // 剔除 JSONP 参数
    charset,
    jsonpCallback,
    jsonpCallbackFunction,
    // 剔除需要进一步处理的
    body,
    ...options
  } = fetcherConfig;
  const fetchOptions: FetchOptions = {
    ...options
  };
  const headers = fetcherConfig.headers || {};
  
  if (body && canHaveBody(fetcherConfig)) {
    if (typeof body === 'string') {
      fetchOptions.body = body;
    } else if (body instanceof URLSearchParams) {
      fetchOptions.body = body;
      delete headers['Content-Type'];
    } else if (body instanceof FormData) {
      fetchOptions.body = body;
      delete headers['Content-Type'];
    } else if (body instanceof Blob) {
      fetchOptions.body = body;
      delete headers['Content-Type'];
    } else if (headers['Content-Type'] === 'application/json') {
      fetchOptions.body = JSON.stringify(body);
    } else {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      fetchOptions.body = serializeBody(body, fetcherConfig.serializeBody);
    }
  }
  
  fetchOptions.headers = headers;
  
  return fetchOptions;
}