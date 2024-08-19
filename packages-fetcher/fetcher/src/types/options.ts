import {
  IFetcherConfig
} from './config';

type TQuickMethodConfigExclusion = 'url' | 'method';

/**
 * 便捷 JSONP 方法，如果第一个参数为对象，则为 options
 */
export interface IFetcherOptionsForQuickJsonp extends Omit<IFetcherConfig, TQuickMethodConfigExclusion> {}

/**
 * 其他便捷方法，如果第一个参数为对象，则为 options
 */
export interface IFetcherOptionsForQuickFn extends Omit<IFetcherConfig, TQuickMethodConfigExclusion | 'charset' | 'jsonpCallback' | 'jsonpCallbackFunction'> {}