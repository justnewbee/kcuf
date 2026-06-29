import {
  CreateLoggerOptions
} from '@kcuf/sls-logger-web';

export interface IFetcherInterceptorSlsOptions extends CreateLoggerOptions {
  topicSuccess?: string;
  topicError?: string;
}
