import type {
  ISlsFactoryOptions,
  ISlsLogOptionsQuick,
  ISlsLogOptions,
  ILogInfo,
  ISlsLog,
  IFnLogQuick
} from '../types';
import {
  getLogOnceKey,
  logPipe,
  flattenObject
} from '../util';

/**
 * 创建 SLS 日志方法，一般直接用于项目
 *
 * 参考：Web Tracking <https://help.aliyun.com/document_detail/31752.html>
 */
export default function createLogger(factoryOptions: ISlsFactoryOptions): ISlsLog {
  const {
    project,
    endpoint,
    logstore,
    apiVersion,
    topicPrefix: factoryTopicPrefix,
    sampling: factorySampling,
    delay: factoryDelay,
    defaultParams,
    onBeforeSend
  } = factoryOptions;
  const pipe = logPipe(project, endpoint, logstore, apiVersion);
  const ONCE: Record<string, 1> = {};
  
  /**
   * 检查是否需要忽略
   */
  function checkIfIgnore(sampling?: number, onceKey?: string): boolean {
    // onBeforeSend 阻止发送
    if (onBeforeSend && onBeforeSend(factoryOptions) === false) { // 不能 simplify to !onBeforeSend(factoryOptions)
      return true;
    }
    
    // 只需要发送一次，已发送过，则忽略
    if (onceKey && ONCE[onceKey]) {
      return true;
    }
    
    // 采样，`(0, 1)` 开区间
    if (typeof sampling === 'number' && sampling > 0 && sampling < 1) {
      return Math.random() > sampling;
    }
    
    return false;
  }
  
  function sls(topic: string): void;
  function sls(topic: string, info: undefined | null, options?: ISlsLogOptions): void;
  function sls<I>(topic: string, info: I, options?: ISlsLogOptions): void;
  
  function sls<I = void>(topic: string, info?: I, options: ISlsLogOptions = {}): void {
    const {
      group = 'LOG',
      topicPrefix = factoryTopicPrefix,
      sampling = factorySampling,
      delay = factoryDelay,
      once,
      instant,
      flatten
    } = options;
    
    const finalTopic = topicPrefix ? `${topicPrefix}${topic}` : topic;
    const onceKey: string | undefined = getLogOnceKey(finalTopic, once);
    
    if (checkIfIgnore(sampling, onceKey)) {
      return;
    }
    
    if (onceKey) {
      ONCE[onceKey] = 1;
    }
    
    const logInfo: ILogInfo = {
      __topic__: finalTopic,
      _GROUP: group,
      ...typeof defaultParams === 'function' ? defaultParams() : defaultParams,
      ...!info || !flatten ? info : flattenObject(info, flatten === true ? '' : flatten)
    };
    
    if (!instant && typeof delay === 'number' && delay > 0) {
      setTimeout(() => pipe(finalTopic, logInfo), delay);
    } else {
      pipe(finalTopic, logInfo, instant);
    }
  }
  
  function creteQuickFn(group: string): IFnLogQuick {
    return (topic: string, info?: unknown, options?: ISlsLogOptionsQuick): void => sls(topic, info, {
      ...options,
      group
    });
  }
  
  sls.debug = creteQuickFn('DEBUG');
  sls.log = creteQuickFn('LOG');
  sls.info = creteQuickFn('INFO');
  sls.warn = creteQuickFn('WARN');
  sls.error = creteQuickFn('ERROR');
  sls.fatal = creteQuickFn('FATAL');
  
  return sls;
}