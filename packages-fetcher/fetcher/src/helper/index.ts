/**
 * 仅供外部是要用，不在此包中使用的帮助方法
 */
export { default as preventEscCancelling } from './prevent-esc-cancelling';
export { default as createFetcherErrorSkipNetwork } from './create-fetcher-error-skip-network';
export { // 这些也当 helper
  // url
  isCors,
  canHaveBody,
  extractProtocolHost,
  buildUrl,
  // error
  createFetcherError,
  // config
  mergeConfig
} from '../util';
