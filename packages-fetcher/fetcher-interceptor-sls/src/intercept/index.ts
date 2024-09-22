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

function getDuration(config: FetcherConfig): number {
  return config._timeStarted ? Date.now() - config._timeStarted : -1;
}

export default function intercept(fetcher: Fetcher, options: IFetcherInterceptorSlsOptions): () => void {
  const {
    topicSuccess = 'fetcher_success',
    topicError = 'fetcher_error',
    ...createLoggerOptions
  } = options;
  const sls = createLogger(createLoggerOptions);
  
  function onFulfilled(data: unknown, config: FetcherConfig, response: FetcherResponse<unknown> | undefined): unknown {
    sls({
      flatten: true
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
        ignore: path => path === 'error.config'
      }
    }, topicError, {
      error,
      request: config,
      response,
      duration: getDuration(config)
    });
    
    throw error;
  }
  
  return fetcher.interceptResponse(onFulfilled, onRejected);
}
