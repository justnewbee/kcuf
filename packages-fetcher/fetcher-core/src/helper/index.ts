/**
 * 仅供外部是要用，不在此包中使用的帮助方法
 */
export { default as deleteConfigHeaders } from './delete-config-headers';
export { default as cloneResponseData } from './clone-response-data';
export { default as createFetcherErrorSkipNetwork } from './create-fetcher-error-skip-network';

// 可能需要用到的 util
export {
  isInstanceofBlob,
  isInstanceofArrayBuffer,
  isInstanceofFormData,
  isInstanceofHeaders,
  isInstanceofUrlSearchParams,
  isConfigJsonp,
  cloneTypeFormData,
  cloneTypeHeaders,
  cloneTypeUrlSearchParams,
  createFetcherError
} from '../util';
