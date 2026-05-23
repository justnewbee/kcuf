/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test
} from 'vitest';

import storageFactory from '../src';

interface IAccount {
  id: string;
  name: string;
  loggedTime: number;
}

const KEY = 'ACCOUNT';

describe('storageFactory', () => {
  test('localStorage', () => {
    localStorage.removeItem(KEY);
    
    const storage = storageFactory<IAccount>(KEY, {
      id: '',
      name: '',
      loggedTime: -1
    });
    
    expect(localStorage.getItem(KEY)).toBeNull();
    expect(storage().loggedTime).toBe(-1); // get will not actually set, but can get wanted type
    expect(localStorage.getItem(KEY)).toBeNull();
    
    storage.update('loggedTime', 12345);
    expect(localStorage.getItem(KEY)).toBeTypeOf('string');
    expect(storage().id).toBe('');
    expect(storage().loggedTime).toBe(12345);
    
    storage.update({
      id: '1234',
      loggedTime: 54321
    });
    expect(localStorage.getItem(KEY)).toBeTypeOf('string');
    expect(storage().id).toBe('1234');
    expect(storage().loggedTime).toBe(54321);
  });
  
  test('localStorage - fail safe', () => {
    localStorage.setItem(KEY, 'i will make parse json error');
    
    const storage = storageFactory<IAccount>(KEY, {
      id: '',
      name: '',
      loggedTime: -1
    });
    
    expect(storage().loggedTime).toBe(-1); // get will not actually set, but can get wanted type
    
    storage.update('loggedTime', 12345);
    expect(storage().id).toBe('');
    expect(storage().loggedTime).toBe(12345);
  });
  
  test('sessionStorage', () => {
    const storage = storageFactory<IAccount>(KEY, {
      id: '',
      name: '',
      loggedTime: -1
    }, true);
    
    expect(sessionStorage.getItem(KEY)).toBeNull();
    expect(storage().loggedTime).toBe(-1); // get will not actually set, but can get wanted type
    expect(sessionStorage.getItem(KEY)).toBeNull();
    
    storage.update('loggedTime', 12345);
    expect(sessionStorage.getItem(KEY)).toBeTypeOf('string');
    expect(storage().id).toBe('');
    expect(storage().loggedTime).toBe(12345);
    
    storage.update({
      id: '1234',
      loggedTime: 54321
    });
    expect(sessionStorage.getItem(KEY)).toBeTypeOf('string');
    expect(storage().id).toBe('1234');
    expect(storage().loggedTime).toBe(54321);
  });
});
