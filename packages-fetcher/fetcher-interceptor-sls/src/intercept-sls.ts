import {
  Fetcher
} from '@kcuf/fetcher-core';
import {
  transport
} from '@kcuf/sls-logger-web';
import interceptSlsCore, {
  FetcherInterceptorSlsOptions
} from '@kcuf/fetcher-interceptor-sls-core';

export default function interceptSls(fetcher: Fetcher, options: FetcherInterceptorSlsOptions, priority?: number): () => void {
  return interceptSlsCore(fetcher, transport, options, priority);
}
