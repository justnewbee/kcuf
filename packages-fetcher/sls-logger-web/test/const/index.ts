import {
  CreateLoggerOptions
} from '../../src';

// 为了不消耗太多测试时间，调整默认值
export const SILENT_TIME = 160;
export const WAIT_TIME = 100;
export const LOGGER_OPTIONS: CreateLoggerOptions = {
  endpoint: 'test-endpoint.sls-aliyuncs.com',
  project: 'test-project',
  logstore: 'test-logstore',
  silentTime: SILENT_TIME,
  waitTime: WAIT_TIME
};
