import {
  CreateLogger,
  GenerateCreateLoggerOptions,
  generateCreateLoggerBase
} from '@kcuf/sls-logger-base';

import {
  sender
} from '../util';

export default function generateCreateLogger(options: GenerateCreateLoggerOptions): CreateLogger {
  return generateCreateLoggerBase(sender, options);
}