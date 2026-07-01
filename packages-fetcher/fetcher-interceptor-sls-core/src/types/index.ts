import {
  CreateLoggerOptions
} from '@kcuf/sls-logger-base';

export interface IFetcherInterceptorSlsOptions extends CreateLoggerOptions {
  topicSuccess?: string;
  topicError?: string;
}
