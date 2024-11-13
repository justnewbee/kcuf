import {
  ILogSender,
  ICreateLogger,
  ICreateLoggerOptions,
  IGenerateCreateLoggerOptions
} from '../types';
import {
  mergeDefaultParams,
  mergeDontSend
} from '../util';

import createLogger from './create-logger';

/**
 * 创建 `createLogger` 方法的方法，对期望扩展默认参数的场景做了规范。
 *
 * 一般不会在项目中直接使用，而是用来写可复用 npm 包。
 */
export default function generateCreateLogger(sender: ILogSender, {
  defaultParams: factoryDefaultParams,
  dontSend: factoryDontSend
}: IGenerateCreateLoggerOptions): ICreateLogger {
  return ({
    defaultParams,
    dontSend,
    ...options
  }: ICreateLoggerOptions) => createLogger(sender, {
    defaultParams: mergeDefaultParams(factoryDefaultParams, defaultParams),
    dontSend: mergeDontSend(factoryDontSend, dontSend),
    ...options
  });
}
