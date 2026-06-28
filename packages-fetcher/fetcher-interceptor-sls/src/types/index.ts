import {
  CreateLoggerOptions
} from '@kcuf/sls-logger-web';

export interface IInterceptSlsOptions extends CreateLoggerOptions {
  topicSuccess?: string;
  topicError?: string;
}
