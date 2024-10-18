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
  API_UPLOAD
} from './const';
import {
  setupFetchMock
} from './util';

describe('upload', () => {
  beforeEach(setupFetchMock);
  
  test('xxx', async () => {
    const formData = new window.FormData();
    
    formData.append('file', new window.File(['bubblegum pie'], 'my-file'));
    
    const promises = fetcher.post(API_UPLOAD.url, {
      body: formData
    });
    
    expect(promises).resolves.toEqual(API_UPLOAD.result);
    
    await promises;
    
    expect(fetchMock.calls().length).toBe(1);
  });
});