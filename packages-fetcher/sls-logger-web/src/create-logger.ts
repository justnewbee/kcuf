import createLoggerBase, {
  SlsLogger,
  CreateLoggerOptions
} from '@kcuf/sls-logger-base';

import transport from './transport';

export default function createLogger(options: CreateLoggerOptions): SlsLogger {
  return createLoggerBase(transport, options);
}
