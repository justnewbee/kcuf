import createLogger from '../../src';
import {
  LOGGER_OPTIONS
} from '../const';

import sender from './sender';

export default createLogger(sender, LOGGER_OPTIONS);