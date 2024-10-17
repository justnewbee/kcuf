import fetchMock from 'fetch-mock';

import {
  APIS,
  RESULTS
} from '../const';

export default function setupFetchMock(): void {
  fetchMock.reset();
  
  fetchMock.get(APIS.GET, () => RESULTS.GET);
  fetchMock.get(APIS.GET_WITH_PARAMS, () => RESULTS.GET_WITH_PARAMS);
  fetchMock.post(APIS.POST, () => RESULTS.POST);
  fetchMock.put(APIS.PUT, () => RESULTS.PUT);
  fetchMock.patch(APIS.PATCH, () => RESULTS.PATCH);
  fetchMock.delete(APIS.DELETE, () => RESULTS.DELETE);
  
  fetchMock.mock(APIS.CORS, () => RESULTS.CORS);
  fetchMock.mock(APIS.CORS2, () => RESULTS.CORS2);
  fetchMock.mock(APIS.ABORT, () => new Promise(resolve => setTimeout(() => resolve(RESULTS.ABORT), 100)));
  
  fetchMock.mock(APIS.TEXT, () => RESULTS.TEXT);
  
  fetchMock.get(APIS.STATUS_200, 200);
  fetchMock.post(APIS.STATUS_201, 201);
  fetchMock.put(APIS.STATUS_255, 255);
  fetchMock.delete(APIS.STATUS_299, 299);
  
  fetchMock.mock(APIS.STATUS_300, 300);
  fetchMock.mock(APIS.STATUS_404, 404);
  fetchMock.mock(APIS.STATUS_500, 500);
  
  fetchMock.get(APIS.TIMEOUT, () => new Promise(resolve => setTimeout(() => resolve({
    hello: 'world'
  }), 250)));
}