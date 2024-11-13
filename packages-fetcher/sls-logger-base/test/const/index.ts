import {
  CreateLoggerOptions
} from '../../src';

// 为了不消耗太多测试时间，调整默认值
export const SILENT_TIME = 160;
export const WAIT_TIME = 100;
export const MAX_CHUNK = 10;
export const LOGGER_OPTIONS: CreateLoggerOptions = {
  endpoint: 'test-endpoint.sls-aliyuncs.com',
  project: 'test-project',
  logstore: 'test-logstore',
  silentTime: SILENT_TIME,
  waitTime: WAIT_TIME,
  maxChunk: MAX_CHUNK
};

export const PAYLOAD_FOR_FLATTEN = {
  _omitByDefault: 1234,
  request: {
    iWillBeIgnored: 'in request',
    url: 'url',
    headers: {},
    params: {
      p1: 1,
      p2: 'p2',
      p3: true,
      p4: [1, 2]
    }
  },
  response: {
    headers: {
      'Content-Type': 'application/json'
    },
    status: 200,
    data: {
      code: 200,
      data: {
        page: 1,
        pageSize: 3,
        total: 1024,
        items: [{
          id: '1',
          name: 'name1',
          path: [[1, 1], [2, 2], [3, 3], [4, 4]]
        }, {
          id: '2',
          name: 'name2',
          path: [[11, 11], [22, 22], [33, 33], [44, 44]]
        }, {
          id: '3',
          name: 'name3',
          path: [[111, 111], [222, 222], [333, 333], [444, 444]]
        }]
      }
    }
  },
  iWillBeIgnored: 111111,
  a: {
    b: {
      c: {
        d: {
          e: {
            f: {
              g: 'ABCDEFG'
            }
          }
        }
      }
    }
  }
};
