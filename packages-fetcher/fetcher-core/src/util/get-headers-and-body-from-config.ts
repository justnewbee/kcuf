import {
  IFetcherConfig,
  TFetcherHeadersNormalized,
  TFetcherBodyNormalized
} from '../types';

import isInstanceofHeaders from './is-instanceof-headers';
import isInstanceofBlob from './is-instanceof-blob';
import isInstanceofFormData from './is-instanceof-form-data';
import isInstanceofUrlSearchParams from './is-instanceof-url-search-params';
import isConfigAllowBody from './is-config-allow-body';
import serializeBody from './serialize-body';
import cloneTypeHeaders from './clone-type-headers';
import headersNormalize from './headers-normalize';
import headersGet from './headers-get';
import headersSet from './headers-set';
import headersDelete from './headers-delete';

/**
 * 处理 headers 和 body
 *
 * 如果 fetch 对 GET/HEAD 请求传入 body，哪怕只是一个空字符串，
 * 浏览器就会直接拒绝并报错「HEAD or GET Request cannot have a body.」
 *
 * 当 `request.headers['Content-Type']` 不存在时，会自动设置 `Content-Type` 的：
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
export default function getHeadersAndBodyFromConfig(config: IFetcherConfig): [TFetcherHeadersNormalized, TFetcherBodyNormalized] {
  const headers = isInstanceofHeaders(config.headers) ? cloneTypeHeaders(config.headers) : headersNormalize(config.headers);
  const body = config.body;
  
  if (!isConfigAllowBody(config)) {
    return [headers, null];
  }
  
  if (body) {
    if (typeof body === 'string') {
      if (!headersGet(headers, 'Content-Type')) {
        headersSet(headers, 'Content-Type', 'application/x-www-form-urlencoded');
      }
      
      return [headers, body];
    }
    
    // URLSearchParams FormData Blob 需要删除 Content-Type
    if (isInstanceofUrlSearchParams(body) || isInstanceofFormData(body) || isInstanceofBlob(body)) {
      headersDelete(headers, 'Content-Type');
      
      return [headers, body];
    }
    
    if (headersGet(headers, 'Content-Type') === 'application/json') {
      return [headers, JSON.stringify(body)];
    }
    
    headersSet(headers, 'Content-Type', 'application/x-www-form-urlencoded');
    
    return [headers, serializeBody(body, config.serializeBody)];
  }
  
  // JSON 的时候不传 body 可能导致后端抛错
  return [headers, headersGet(headers, 'Content-Type') === 'application/json' ? '{}' : null];
}
