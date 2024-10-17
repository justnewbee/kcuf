/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test,
  beforeEach
} from 'vitest';
import fetchMock from 'fetch-mock';

import fetcher from '../src';

import {
  APIS,
  RESULTS
} from './const';
import {
  setupFetchMock
} from './util';

describe('upload', () => {
  beforeEach(setupFetchMock);
  
  test('xxx', async () => {
    const formData = new window.FormData();
    
    formData.append('file', new window.File(['bubblegum pie'], 'my-file'));
    
    const promises = fetcher.post(APIS.UPLOAD, {
      body: formData
    });
    
    expect(promises).resolves.toEqual(RESULTS.UPLOAD);
    
    await promises;
    
    expect(fetchMock.calls().length).toBe(1);
  });
});