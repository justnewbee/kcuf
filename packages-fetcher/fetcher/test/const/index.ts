export const APIS = {
  GET: '/api/get',
  GET_WITH_PARAMS: '/api/get-with-params?id=1234&arr=1&arr=2',
  POST: '/api/post',
  PUT: '/api/put',
  PATCH: '/api/patch',
  DELETE: '/api/delete',
  UPLOAD: '/api/upload',
  TEXT: '/api/text',
  CORS: 'https://anotherdomain.com/api/cors',
  CORS2: 'http://anotherdomain.com/api/cors',
  ABORT: '/api/abort',
  STATUS_200: '/api/200',
  STATUS_201: '/api/201',
  STATUS_255: '/api/255',
  STATUS_299: '/api/299',
  STATUS_300: '/api/300',
  STATUS_404: '/api/404',
  STATUS_500: '/api/500',
  TIMEOUT: '/api/timeout'
};

export const RESULTS = {
  GET: {
    m: 'GET'
  },
  GET_WITH_PARAMS: {
    m: 'GET',
    data: 'with parameters'
  },
  POST: {
    m: 'POST'
  },
  PUT: {
    m: 'PUT'
  },
  PATCH: {
    m: 'PATCH'
  },
  DELETE: {
    m: 'DELETE'
  },
  UPLOAD: {
    m: 'UPLOAD'
  },
  CORS: {
    m: 'CORS'
  },
  CORS2: {
    m: 'CORS2'
  },
  ABORT: {
    m: 'ABORT'
  },
  TEXT: 'api returning text',
  TIMEOUT: {
    m: '*',
    data: 'might timeout'
  }
};
