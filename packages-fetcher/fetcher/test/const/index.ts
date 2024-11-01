import {
  IMockApi
} from '../types';

export const API_GET: IMockApi = {
  method: 'get',
  url: '/api/get',
  result: {
    data: 'GET'
  }
};
export const API_GET_WITH_PARAMS: IMockApi = {
  method: 'get',
  url: '/api/get-with-params',
  match: /\/api\/get-with-params\?.*/,
  result: {
    data: 'GET_WITH_PARAMS'
  }
};
export const API_POST: IMockApi = {
  method: 'post',
  url: '/api/post',
  result: {
    data: 'POST'
  }
};
export const API_PUT: IMockApi = {
  method: 'put',
  url: '/api/put',
  result: {
    data: 'PUT'
  }
};
export const API_PATCH: IMockApi = {
  method: 'patch',
  url: '/api/patch',
  result: {
    data: 'PATCH'
  }
};
export const API_DELETE: IMockApi = {
  method: 'delete',
  url: '/api/delete',
  result: {
    data: 'DELETE'
  }
};
export const API_UPLOAD: IMockApi = {
  url: '/api/upload',
  result: {
    data: 'UPLOAD'
  }
};
export const API_TEXT: IMockApi = {
  url: '/api/text',
  result: {
    data: 'TEXT'
  }
};
export const API_CORS: IMockApi = {
  url: 'https://anotherdomain.com/api/cors',
  result: {
    data: 'CORS'
  }
};
export const API_CORS2: IMockApi = {
  url: 'http://anotherdomain.com/api/cors',
  result: {
    data: 'CORS2'
  }
};
export const API_STATUS_200: IMockApi = {
  url: '/api/200',
  result: 200
};
export const API_STATUS_201: IMockApi = {
  url: '/api/201',
  result: 201
};
export const API_STATUS_255: IMockApi = {
  url: '/api/255',
  result: 255
};
export const API_STATUS_299: IMockApi = {
  url: '/api/299',
  result: 299
};
export const API_STATUS_300: IMockApi = {
  url: '/api/300',
  result: 300
};
export const API_STATUS_404: IMockApi = {
  url: '/api/404',
  result: 404
};
export const API_STATUS_500: IMockApi = {
  url: '/api/500',
  result: 500
};
export const API_ABORT: IMockApi = {
  url: '/api/abort',
  result: {
    data: 'ABORT'
  },
  timeout: 200
};
export const API_TIMEOUT: IMockApi = {
  url: '/api/timeout',
  result: {
    data: 'TIMEOUT'
  },
  timeout: 250
};
