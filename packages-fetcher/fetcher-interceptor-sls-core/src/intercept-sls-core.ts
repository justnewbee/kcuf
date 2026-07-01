import {
  Fetcher,
  FetcherError,
  FetcherConfig,
  FetcherResponse
} from '@kcuf/fetcher-core';
import createLogger, {
  SlsLoggerTransport
} from '@kcuf/sls-logger-base';

import {
  IFetcherInterceptorSlsOptions
} from './types';
import {
  getDuration
} from './util';

const FLATTEN_DIRECT = ['request.headers', 'request.body', 'response.headers', 'response.data'];

export default function interceptSlsCore(fetcher: Fetcher, transport: SlsLoggerTransport, options: IFetcherInterceptorSlsOptions, priority = 50): () => void {
  const {
    topicSuccess = 'fetcher_success',
    topicError = 'fetcher_error',
    ...createLoggerOptions
  } = options;
  const sls = createLogger(transport, createLoggerOptions);
  
  function onFulfilled(data: unknown, config: FetcherConfig, response: FetcherResponse<unknown> | undefined): unknown {
    sls({
      flatten: {
        direct: FLATTEN_DIRECT
      }
    }, topicSuccess, {
      request: config,
      response,
      duration: getDuration(config)
    });
    
    return data;
  }
  
  function onRejected(error: FetcherError, config: FetcherConfig, response?: FetcherResponse<unknown>): never {
    sls.error({
      flatten: {
        omit: 'error.config',
        direct: FLATTEN_DIRECT
      }
    }, topicError, {
      error,
      request: config,
      response,
      duration: getDuration(config)
    });
    
    throw error;
  }
  
  return fetcher.interceptResponse(onFulfilled, onRejected, priority);
}
