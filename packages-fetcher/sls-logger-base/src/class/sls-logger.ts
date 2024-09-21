import _isError from 'lodash/isError';

import {
  TLogArgs,
  ICreateLoggerOptions,
  ILogSender,
  ISlsLogOptions,
  ISlsLogFn
} from '../types';
import {
  API_VERSION,
  PIPE_SILENT_TIME,
  PIPE_WAIT_TIME,
  PIPE_MAX_CHUNK
} from '../const';
import {
  getLogOnceKey,
  flattenObject,
  convertErrorToPlain,
  resolveDefaultParams
} from '../util';

import SlsPipe from './sls-pipe';

/**
 * 创建 SLS 日志方法
 */
export default class SlsLogger {
  private readonly options: ICreateLoggerOptions;
  private readonly slsPipe: SlsPipe;
  private once: Record<string, 1> = {};
  
  constructor(sender: ILogSender, options: ICreateLoggerOptions) {
    this.options = options;
    this.slsPipe = new SlsPipe(sender, {
      trackUrl: `https://${options.project}.${options.endpoint}/logstores/${options.logstore}/track`,
      apiVersion: options.apiVersion || API_VERSION,
      silentTime: options.silentTime ?? PIPE_SILENT_TIME,
      waitTime: options.waitTime ?? PIPE_WAIT_TIME,
      maxChunk: options.maxChunk ?? PIPE_MAX_CHUNK
    });
  }
  
  log: ISlsLogFn = (...args: TLogArgs): void => {
    let options: ISlsLogOptions = {};
    let topic: string;
    let payload: Record<string, unknown> | undefined;
    
    if (typeof args[0] === 'string') {
      [topic, payload] = args as [string, Record<string, unknown>?];
    } else {
      [options, topic, payload] = args as [ISlsLogOptions, string, Record<string, unknown>?];
    }
    
    const {
      options: {
        topicPrefix: factoryTopicPrefix,
        sampling: factorySampling,
        defaultParams
      }
    } = this;
    const {
      group = 'LOG',
      topicPrefix = factoryTopicPrefix,
      sampling = factorySampling,
      instant,
      once,
      flatten
    } = options;
    const finalTopic = topicPrefix ? `${topicPrefix}${topic}` : topic;
    const onceKey: string | undefined = getLogOnceKey(finalTopic, once);
    
    if (this.shouldIgnore(sampling, onceKey)) {
      return;
    }
    
    if (onceKey) {
      this.once[onceKey] = 1;
    }
    
    let plainInfo: object | undefined;
    
    if (payload) {
      if (flatten) {
        plainInfo = flattenObject(payload, flatten === true ? '' : flatten);
      } else if (_isError(payload)) {
        plainInfo = convertErrorToPlain(payload);
      } else {
        plainInfo = payload;
      }
    }
    
    this.slsPipe.pipe({
      ...resolveDefaultParams(defaultParams),
      ...plainInfo,
      __topic__: finalTopic,
      _GROUP: group
    }, instant);
  };
  
  /**
   * 检查是否需要忽略
   */
  private shouldIgnore(sampling?: number, onceKey?: string): boolean {
    const {
      options: {
        shouldIgnore
      }
    } = this;
    
    if (onceKey && this.once[onceKey]) { // 只需发送一次，已发送过，忽略
      return true;
    }
    
    if (shouldIgnore?.() === true) { // shouldIgnore 阻止发送
      return true;
    }
    
    if (typeof sampling === 'number' && sampling > 0 && sampling < 1) { // 采样，`(0, 1)` 开区间
      return Math.random() > sampling;
    }
    
    return false;
  }
}