import {
  IFetcherConfig,
  IFetcherError,
  IFetcherErrorExtendedInfo
} from '../types';

/**
 * 创建 FetcherError 它一定得有 config 属性
 */
export default function createFetcherError(fetcherConfig: IFetcherConfig, name: string, message?: string, info: IFetcherErrorExtendedInfo = {}): IFetcherError {
  const error = new Error(message) as IFetcherError;
  
  error.name = name;
  
  if (info.title) {
    error.title = info.title;
  }
  
  if (info.code) {
    error.code = info.code;
  }
  
  error.config = fetcherConfig;
  
  if (info.responseData) {
    error.responseData = info.responseData;
  }
  
  return error;
}