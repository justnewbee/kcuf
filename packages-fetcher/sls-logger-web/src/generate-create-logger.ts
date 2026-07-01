import {
  CreateLogger,
  GenerateCreateLoggerOptions,
  generateCreateLoggerBase
} from '@kcuf/sls-logger-base';

import transport from './transport';

export default function generateCreateLogger(options: GenerateCreateLoggerOptions): CreateLogger {
  return generateCreateLoggerBase(transport, options);
}
