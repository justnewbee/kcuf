import {
  ICreateLoggerOptions,
  ISlsLogger,
  ILogSender
} from '../types';
import {
  SlsLogger
} from '../class';
import {
  createSlsLogQuick
} from '../util';

/**
 * 创建 Logger 方法
 */
export default function createLogger(sender: ILogSender, options: ICreateLoggerOptions): ISlsLogger {
  const logger = new SlsLogger(sender, options);
  const sls = logger.log as ISlsLogger;
  
  sls.debug = createSlsLogQuick(sls, 'DEBUG');
  sls.log = createSlsLogQuick(sls, 'LOG');
  sls.info = createSlsLogQuick(sls, 'INFO');
  sls.warn = createSlsLogQuick(sls, 'WARN');
  sls.error = createSlsLogQuick(sls, 'ERROR');
  sls.fatal = createSlsLogQuick(sls, 'FATAL');
  
  return sls;
}