import createLoggerBase, {
  SlsLogger,
  CreateLoggerOptions
} from '@kcuf/sls-logger-base';

import {
  sender
} from '../util';

export default function createLogger(options: CreateLoggerOptions): SlsLogger {
  return createLoggerBase(sender, options);
}
