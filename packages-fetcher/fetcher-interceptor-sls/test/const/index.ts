import {
  FetcherInterceptorSlsOptions
} from '../../src';

// 为了不消耗太多测试时间，调整默认值
export const SLS_SILENT_TIME = 160;
export const SLS_WAIT_TIME = 100;

export const INTERCEPTOR_OPTIONS = {
  endpoint: 'test-endpoint.sls-aliyuncs.com',
  project: 'test-project',
  logstore: 'test-logstore',
  silentTime: SLS_SILENT_TIME,
  waitTime: SLS_WAIT_TIME
} satisfies FetcherInterceptorSlsOptions;