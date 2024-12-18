import {
  IErrorExtendedInfo,
  IFetcherConfig,
  IFetcherError
} from '../types';

/**
 * 创建 FetcherError 它一定得有 config 属性
 */
export default function createFetcherError(config: IFetcherConfig, name: string, message?: string, info: IErrorExtendedInfo = {}): IFetcherError {
  const error = new Error(message) as IFetcherError;
  
  error.name = name;
  
  if (info.title) {
    error.title = info.title;
  }
  
  if (info.code) {
    error.code = info.code;
  }
  
  error.config = config;
  
  if (info.responseData) {
    error.responseData = info.responseData;
  }
  
  return error;
}