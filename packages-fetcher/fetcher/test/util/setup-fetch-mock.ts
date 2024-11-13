import fetchMock from 'fetch-mock';

import {
  API_GET,
  API_GET_WITH_PARAMS,
  API_POST,
  API_PUT,
  API_PATCH,
  API_DELETE,
  API_UPLOAD,
  API_TEXT,
  API_CORS,
  API_CORS2,
  API_STATUS_200,
  API_STATUS_201,
  API_STATUS_255,
  API_STATUS_299,
  API_STATUS_300,
  API_STATUS_404,
  API_STATUS_500,
  API_ABORT,
  API_TIMEOUT
} from '../const';

import createMockResponse from './create-mock-response';

export default function setupFetchMock(): void {
  fetchMock.clearHistory();
  fetchMock.removeRoutes();
  fetchMock.mockGlobal();
  
  [
    API_GET,
    API_GET_WITH_PARAMS,
    API_POST,
    API_PUT,
    API_PATCH,
    API_DELETE,
    API_UPLOAD,
    API_TEXT,
    API_CORS,
    API_CORS2,
    API_STATUS_200,
    API_STATUS_201,
    API_STATUS_255,
    API_STATUS_299,
    API_STATUS_300,
    API_STATUS_404,
    API_STATUS_500,
    API_ABORT,
    API_TIMEOUT
  ].forEach(v => {
    switch (v.method) {
    case 'get':
      fetchMock.get(v.match || v.url, createMockResponse(v));
        
      break;
    case 'post':
      fetchMock.post(v.match || v.url, createMockResponse(v));
        
      break;
    case 'put':
      fetchMock.put(v.match || v.url, createMockResponse(v));
        
      break;
    case 'patch':
      fetchMock.patch(v.match || v.url, createMockResponse(v));
        
      break;
    case 'delete':
      fetchMock.delete(v.match || v.url, createMockResponse(v));
        
      break;
    default:
      fetchMock.route(v.match || v.url, createMockResponse(v));
        
      break;
    }
  });
}
