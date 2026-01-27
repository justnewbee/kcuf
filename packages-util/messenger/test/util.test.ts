/**
 * @vitest-environment jsdom
 */
import {
  describe,
  test,
  expect
} from 'vitest';

import {
  errorToPlain,
  plainToError,
  buildPayloadForPromise
} from '../src/util';

interface IError extends Error {
  code?: string;
  customProp?: string;
}

describe('errorToPlain', () => {
  test('should convert Error object to plain object', () => {
    const error = new Error('Test error');
    const plain = errorToPlain(error);
    
    expect(plain).toBeInstanceOf(Object);
    expect(plain.message).toBe('Test error');
    expect(plain.name).toBe('Error');
    expect(plain.stack).toBeDefined();
  });
  
  test('should handle custom error properties', () => {
    const error = new Error('Custom error');
    
    (error as IError).code = 'CUSTOM_CODE';
    (error as IError).customProp = 'custom value';
    
    const plain = errorToPlain(error);
    
    expect(plain.customProp).toBe('custom value');
    expect(plain.code).toBe('CUSTOM_CODE');
    expect(plain.message).toBe('Custom error');
  });
  
  test('should handle TypeError', () => {
    const error = new TypeError('Type error');
    const plain = errorToPlain(error);
    
    expect(plain.name).toBe('TypeError');
    expect(plain.message).toBe('Type error');
  });
  
  test('should handle RangeError', () => {
    const error = new RangeError('Range error');
    const plain = errorToPlain(error);
    
    expect(plain.name).toBe('RangeError');
    expect(plain.message).toBe('Range error');
  });
  
  test('should return non-error objects as-is', () => {
    const obj = {
      key: 'value'
    };
    const plain = errorToPlain(obj as unknown);
    
    expect(plain).toEqual(obj);
  });
  
  test('should handle string errors', () => {
    const str = 'error message';
    const plain = errorToPlain(str);
    
    expect(plain).toBe(str);
  });
  
  test('should ensure message, name, and stack are present', () => {
    const error = new Error('Test');
    const plain = errorToPlain(error);
    
    expect(plain).toHaveProperty('message');
    expect(plain).toHaveProperty('name');
    expect(plain).toHaveProperty('stack');
  });
  
  test('should handle error with no message', () => {
    const error = new Error();
    const plain = errorToPlain(error);
    
    expect(plain.message).toBeDefined();
    expect(plain.name).toBe('Error');
  });
  
  test('should preserve error prototype chain properties', () => {
    class CustomError extends Error {
      constructor(message: string, public code: string) {
        super(message);
        this.name = 'CustomError';
      }
    }
    
    const error = new CustomError('Custom error', 'CUSTOM');
    const plain = errorToPlain(error);
    
    expect(plain.message).toBe('Custom error');
    expect(plain.name).toBe('CustomError');
    expect(plain.code).toBe('CUSTOM');
  });
});

describe('plainToError', () => {
  test('should convert plain object to Error object', () => {
    const plain = {
      message: 'Test error',
      name: 'Error',
      stack: 'Error: Test error\n  at test'
    };
    
    const error = plainToError(plain);
    
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('Error');
    expect(error.message).toBe('Test error');
  });
  
  test('should preserve custom properties', () => {
    const plain = {
      message: 'Test error',
      code: 'TEST_CODE',
      customProp: 'custom value'
    };
    
    const error = plainToError(plain);
    
    expect((error as IError).code).toBe('TEST_CODE');
    expect((error as IError).customProp).toBe('custom value');
    expect(error.message).toBe('Test error');
  });
  
  test('should handle non-plain objects', () => {
    const obj = new Error('Original error');
    const result = plainToError(obj as unknown as Record<string, unknown>);
    
    expect(result).toBe(obj);
  });
  
  test('should create a new Error instance for plain objects', () => {
    const plain = {
      message: 'Error message'
    };
    const error = plainToError(plain);
    
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Error message');
  });
  
  test('should handle empty plain object', () => {
    const plain = {};
    const error = plainToError(plain);
    
    expect(error).toBeInstanceOf(Error);
  });
  
  test('should roundtrip: errorToPlain -> plainToError', () => {
    const originalError = new Error('Original error');
    
    (originalError as IError).code = 'ERR_CODE';
    
    const plain = errorToPlain(originalError);
    const reconstructedError = plainToError(plain);
    
    expect(reconstructedError).toBeInstanceOf(Error);
    expect(reconstructedError.message).toBe(originalError.message);
    expect((reconstructedError as IError).code).toBe('ERR_CODE');
  });
  
  test('should handle TypeError in plain object', () => {
    const plain = {
      message: 'Type error',
      name: 'TypeError'
    };
    
    const error = plainToError(plain);
    
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('TypeError');
  });
});

describe('buildPayloadForPromise', () => {
  test('should build payload with _dismiss_ and payload', () => {
    const payload = buildPayloadForPromise('test-type', 'test-payload');
    
    expect(payload).toHaveProperty('_dismiss_');
    expect(payload).toHaveProperty('payload');
    expect(payload.payload).toBe('test-payload');
  });
  
  test('should generate unique _dismiss_ values', () => {
    const payload1 = buildPayloadForPromise('test-type', 'payload1');
    const payload2 = buildPayloadForPromise('test-type', 'payload2');
    
    expect(payload1._dismiss_).not.toBe(payload2._dismiss_);
  });
  
  test('should include type in _dismiss_ value', () => {
    const type = 'my-event-type';
    const payload = buildPayloadForPromise(type, {});
    
    expect(payload._dismiss_).toContain(type);
    expect(payload._dismiss_).toContain('/end/');
  });
  
  test('should handle undefined payload', () => {
    const payload = buildPayloadForPromise('test-type', undefined);
    
    expect(payload._dismiss_).toBeDefined();
    expect(payload.payload).toBeUndefined();
  });
  
  test('should handle null payload', () => {
    const payload = buildPayloadForPromise('test-type', null);
    
    expect(payload._dismiss_).toBeDefined();
    expect(payload.payload).toBeNull();
  });
  
  test('should handle complex payload objects', () => {
    const complexPayload = {
      nested: {
        deep: {
          value: 123
        }
      },
      array: [1, 2, 3],
      string: 'test'
    };
    
    const payload = buildPayloadForPromise('test-type', complexPayload);
    
    expect(payload.payload).toEqual(complexPayload);
  });
  
  test('_dismiss_ should follow expected format', () => {
    const type = 'test-event';
    const payload = buildPayloadForPromise(type, {});
    const regex = /^test-event\/end\/\d+-\d+$/;
    
    expect(payload._dismiss_).toMatch(regex);
  });
  
  test('should handle event type with special characters', () => {
    const type = 'my-event:sub/path.type';
    const payload = buildPayloadForPromise(type, {});
    
    expect(payload._dismiss_).toContain(type);
  });
  
  test('should generate timestamp in _dismiss_', () => {
    const before = Date.now();
    const payload = buildPayloadForPromise('test', {});
    const after = Date.now();
    
    const dismissParts = payload._dismiss_.split('/');
    const timestamp = parseInt(dismissParts[2]?.split('-')[0] ?? '0', 10);
    
    expect(timestamp).toBeGreaterThanOrEqual(before);
    expect(timestamp).toBeLessThanOrEqual(after);
  });
  
  test('should generate random component in _dismiss_', () => {
    const payload1 = buildPayloadForPromise('test', {});
    const payload2 = buildPayloadForPromise('test', {});
    
    // Extract random parts
    const random1 = payload1._dismiss_.split('-')[1];
    const random2 = payload2._dismiss_.split('-')[1];
    
    expect(random1).not.toBe(random2);
  });
  
  test('should handle numeric payload', () => {
    const payload = buildPayloadForPromise('test-type', 123);
    
    expect(payload.payload).toBe(123);
  });
  
  test('should handle boolean payload', () => {
    const payload = buildPayloadForPromise('test-type', true);
    
    expect(payload.payload).toBe(true);
  });
  
  test('should handle array payload', () => {
    const arrayPayload = [1, 2, 3];
    const payload = buildPayloadForPromise('test-type', arrayPayload);
    
    expect(payload.payload).toEqual(arrayPayload);
  });
});
