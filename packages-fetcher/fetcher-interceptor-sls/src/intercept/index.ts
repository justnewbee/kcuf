import {
  Fetcher,
  FetcherError,
  FetcherConfig,
  FetcherResponse
} from '@kcuf/fetcher';
import createLogger from '@kcuf/sls-logger-web';

import {
  IFetcherInterceptorSlsOptions
} from '../types';

const FLATTEN_DIRECT = ['request.headers', 'request.body', 'response.headers', 'response.data'];

function getDuration(config: FetcherConfig): number {
  return config._timeStarted ? Date.now() - config._timeStarted : -1;
}

export default function intercept(fetcher: Fetcher, options: IFetcherInterceptorSlsOptions, priority = 50): () => void {
  const {
    topicSuccess = 'fetcher_success',
    topicError = 'fetcher_error',
    ...createLoggerOptions
  } = options;
  const sls = createLogger(createLoggerOptions);
  
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
