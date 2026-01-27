/**
 * @vitest-environment jsdom
 */
import {
  beforeEach,
  describe,
  expect,
  test,
  vi
} from 'vitest';

import Messenger from '../src/messenger';

describe('Messenger', () => {
  let messenger: Messenger;
  
  beforeEach(() => {
    // 为每个测试创建一个新的 Messenger 实例
    messenger = new Messenger();
  });
  
  describe('emit', () => {
    test('should emit a message without payload', async () => {
      const callback = vi.fn<() => void>();
      
      messenger.on('test-event', callback);
      
      await new Promise(resolve => {
        setTimeout(() => {
          messenger.emit('test-event');
          
          setTimeout(() => {
            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith(undefined);
            resolve(null);
          }, 50);
        }, 10);
      });
    });
    
    test('should emit a message with payload', async () => {
      const callback = vi.fn<() => void>();
      const payload = {
        name: 'test',
        value: 123
      };
      
      messenger.on('test-event', callback);
      
      await new Promise(resolve => {
        setTimeout(() => {
          messenger.emit('test-event', payload);
          
          setTimeout(() => {
            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith(payload);
            resolve(null);
          }, 50);
        }, 10);
      });
    });
    
    test('should emit to different event types separately', async () => {
      const callback1 = vi.fn<() => void>();
      const callback2 = vi.fn<() => void>();
      
      messenger.on('event-1', callback1);
      messenger.on('event-2', callback2);
      
      await new Promise(resolve => {
        setTimeout(() => {
          messenger.emit('event-1', {
            type: 1
          });
          
          setTimeout(() => {
            expect(callback1).toHaveBeenCalledWith({
              type: 1
            });
            expect(callback2).not.toHaveBeenCalled();
            resolve(null);
          }, 50);
        }, 10);
      });
    });
    
    test('should support custom targetOrigin option', () => {
      const postMessageSpy = vi.spyOn(window, 'postMessage');
      
      messenger.emit('test-event', {
        data: 'test'
      }, {
        targetOrigin: 'https://example.com'
      });
      
      expect(postMessageSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'test-event',
        payload: {
          data: 'test'
        }
      }), 'https://example.com');
      
      postMessageSpy.mockRestore();
    });
  });
  
  describe('on', () => {
    test('should register a listener and return an off function', async () => {
      const callback = vi.fn<() => void>();
      
      const off = messenger.on('test-event', callback);
      
      expect(typeof off).toBe('function');
      
      await new Promise(resolve => {
        setTimeout(() => {
          messenger.emit('test-event', 'first');
          messenger.emit('test-event', 'second');
          
          setTimeout(() => {
            expect(callback).toHaveBeenCalledTimes(2);
            
            off(); // Call off to unregister the listener
            
            setTimeout(() => {
              messenger.emit('test-event', 'third');
              
              setTimeout(() => {
                expect(callback).toHaveBeenCalledTimes(2); // Should still be called only twice (from before off())
                resolve(null);
              }, 50);
            }, 10);
          }, 50);
        }, 10);
      });
    });
    
    test('should support multiple listeners on the same event', async () => {
      const callback1 = vi.fn<() => void>();
      const callback2 = vi.fn<() => void>();
      
      messenger.on('test-event', callback1);
      messenger.on('test-event', callback2);
      
      await new Promise(resolve => {
        setTimeout(() => {
          messenger.emit('test-event', 'data');
          
          setTimeout(() => {
            expect(callback1).toHaveBeenCalledTimes(1);
            expect(callback2).toHaveBeenCalledTimes(1);
            expect(callback1).toHaveBeenCalledWith('data');
            expect(callback2).toHaveBeenCalledWith('data');
            resolve(null);
          }, 50);
        }, 10);
      });
    });
  });
  
  describe('once', () => {
    test('should register a listener that fires only once', async () => {
      const callback = vi.fn<() => void>();
      
      messenger.once('test-event', callback);
      
      await new Promise(resolve => {
        setTimeout(() => {
          messenger.emit('test-event', 'first');
          
          setTimeout(() => {
            expect(callback).toHaveBeenCalledTimes(1);
            
            messenger.emit('test-event', 'second');
            
            setTimeout(() => {
              expect(callback).toHaveBeenCalledTimes(1);
              expect(callback).toHaveBeenCalledWith('first');
              resolve(null);
            }, 50);
          }, 50);
        }, 10);
      });
    });
    
    test('should support canceling a once listener with off', async () => {
      const callback = vi.fn<() => void>();
      
      const off = messenger.once('test-event', callback);
      
      await new Promise(resolve => {
        setTimeout(() => {
          off();
          
          setTimeout(() => {
            messenger.emit('test-event', 'data');
            
            setTimeout(() => {
              expect(callback).not.toHaveBeenCalled();
              resolve(null);
            }, 50);
          }, 10);
        }, 10);
      });
    });
    
    test('should handle multiple once listeners on the same event', async () => {
      const callback1 = vi.fn<() => void>();
      const callback2 = vi.fn<() => void>();
      
      messenger.once('test-event', callback1);
      messenger.once('test-event', callback2);
      
      await new Promise(resolve => {
        setTimeout(() => {
          messenger.emit('test-event', 'data');
          
          setTimeout(() => {
            expect(callback1).toHaveBeenCalledTimes(1);
            expect(callback2).toHaveBeenCalledTimes(1);
            
            messenger.emit('test-event', 'data2');
            
            setTimeout(() => {
              expect(callback1).toHaveBeenCalledTimes(1);
              expect(callback2).toHaveBeenCalledTimes(1);
              resolve(null);
            }, 50);
          }, 50);
        }, 10);
      });
    });
  });
  
  describe('emitPromise and onPromise', () => {
    test('should resolve when onPromise handler returns a value', async () => {
      messenger.onPromise('request', () => {
        return 'response';
      });
      
      const result = await messenger.emitPromise<string>('request');
      
      expect(result).toBe('response');
    });
    
    test('should resolve with payload from onPromise handler', async () => {
      messenger.onPromise<number, {
        value: number;
      }>('calculate', payload => {
        return payload.value * 2;
      });
      
      const result = await messenger.emitPromise<number>('calculate', {
        value: 5
      });
      
      expect(result).toBe(10);
    });
    
    test('should handle async onPromise handler', async () => {
      messenger.onPromise('async-request', async () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('async-response');
          }, 50);
        });
      });
      
      const result = await messenger.emitPromise<string>('async-request');
      
      expect(result).toBe('async-response');
    });
    
    test('should reject when onPromise handler rejects', async () => {
      messenger.onPromise('reject-request', async () => {
        return Promise.reject(new Error('Rejection error'));
      });
      
      try {
        await messenger.emitPromise('reject-request');
        expect.fail('Should have thrown an error');
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect((err as Error).message).toBe('Rejection error');
      }
    });
    
    test('should handle Error object in rejection', async () => {
      const customError = new Error('Custom error');
      
      customError.name = 'CustomError';
      
      messenger.onPromise('error-request', async () => {
        return Promise.reject(customError);
      });
      
      try {
        await messenger.emitPromise('error-request');
        expect.fail('Should have thrown an error');
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect((err as Error).name).toBe('CustomError');
        expect((err as Error).message).toBe('Custom error');
      }
    });
    
    test('should handle non-Error rejection', async () => {
      messenger.onPromise('non-error-request', async () => {
        return Promise.reject('string error'); // eslint-disable-line @typescript-eslint/prefer-promise-reject-errors
      });
      
      try {
        await messenger.emitPromise('non-error-request');
        expect.fail('Should have thrown an error');
      } catch (err) {
        expect(err).toBe('string error');
      }
    });
    
    test('should resolve with undefined when onPromise handler returns nothing', async () => {
      messenger.onPromise('void-request', () => {
        // intentionally returns nothing
      });
      
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      expect(await messenger.emitPromise('void-request')).toBeUndefined();
    });
    
    test('should handle multiple onPromise listeners independently', async () => {
      const handler1 = vi.fn().mockReturnValue('response1');
      const handler2 = vi.fn().mockReturnValue('response2');
      
      messenger.onPromise('shared-event', handler1);
      messenger.onPromise('shared-event', handler2);
      
      const result = await messenger.emitPromise<string>('shared-event', 'data');
      
      // Only the first handler's response is used (Promise resolves immediately after first response)
      expect(result).toBe('response1');
    });
    
    test('should pass payload through emitPromise to onPromise', async () => {
      const callback = vi.fn().mockReturnValue('result');
      
      messenger.onPromise('with-payload', callback);
      
      await messenger.emitPromise('with-payload', {
        key: 'value'
      });
      
      expect(callback).toHaveBeenCalledWith({
        key: 'value'
      });
    });
  });
  
  describe('mixed on and once listeners', () => {
    test('should handle mixed on and once listeners correctly', async () => {
      const onCallback = vi.fn<() => void>();
      const onceCallback = vi.fn<() => void>();
      
      messenger.on('event', onCallback);
      messenger.once('event', onceCallback);
      
      await new Promise(resolve => {
        setTimeout(() => {
          messenger.emit('event', 'first');
          
          setTimeout(() => {
            expect(onCallback).toHaveBeenCalledTimes(1);
            expect(onceCallback).toHaveBeenCalledTimes(1);
            
            messenger.emit('event', 'second');
            
            setTimeout(() => {
              expect(onCallback).toHaveBeenCalledTimes(2);
              expect(onceCallback).toHaveBeenCalledTimes(1);
              resolve(null);
            }, 50);
          }, 50);
        }, 10);
      });
    });
  });
  
  describe('edge cases', () => {
    test('should handle undefined payload', async () => {
      const callback = vi.fn<() => void>();
      
      messenger.on('test', callback);
      
      await new Promise(resolve => {
        setTimeout(() => {
          messenger.emit('test', undefined);
          
          setTimeout(() => {
            expect(callback).toHaveBeenCalledWith(undefined);
            resolve(null);
          }, 50);
        }, 10);
      });
    });
    
    test('should handle null payload', async () => {
      const callback = vi.fn<() => void>();
      
      messenger.on('test', callback);
      
      await new Promise(resolve => {
        setTimeout(() => {
          messenger.emit('test', null);
          
          setTimeout(() => {
            expect(callback).toHaveBeenCalledWith(null);
            resolve(null);
          }, 50);
        }, 10);
      });
    });
    
    test('should handle complex payload objects', async () => {
      const callback = vi.fn<() => void>();
      const payload = {
        nested: {
          deep: {
            value: 123
          }
        },
        array: [1, 2, 3],
        string: 'test'
      };
      
      messenger.on('test', callback);
      
      await new Promise(resolve => {
        setTimeout(() => {
          messenger.emit('test', payload);
          
          setTimeout(() => {
            expect(callback).toHaveBeenCalledWith(payload);
            resolve(null);
          }, 50);
        }, 10);
      });
    });
    
    test('should clean up internal state when all listeners are removed', async () => {
      const off1 = messenger.on('cleanup-test', () => {
        // nothing
      });
      const off2 = messenger.on('cleanup-test', () => {
        // nothing
      });
      
      off1();
      off2();
      
      await new Promise(resolve => {
        setTimeout(() => {
          const off3 = messenger.on('cleanup-test', () => {
            // nothing
          });
          
          off3();
          resolve(null);
        }, 10);
      });
    });
    
    test('should handle onPromise callback without _dismiss_ property', async () => {
      const callback = vi.fn<() => void>();
      
      messenger.on('regular-event', callback);
      
      await new Promise(resolve => {
        setTimeout(() => {
          messenger.emit('regular-event', {
            data: 'test'
          });
          
          setTimeout(() => {
            expect(callback).toHaveBeenCalledWith({
              data: 'test'
            });
            resolve(null);
          }, 50);
        }, 10);
      });
    });
    
    test('should remove receiver correctly', async () => {
      const callback = vi.fn<() => void>();
      
      const off = messenger.on('remove-test', callback);
      
      await new Promise(resolve => {
        setTimeout(() => {
          messenger.emit('remove-test', 'first');
          
          setTimeout(() => {
            off();
            
            setTimeout(() => {
              messenger.emit('remove-test', 'second');
              
              setTimeout(() => {
                expect(callback).toHaveBeenCalledTimes(1);
                expect(callback).toHaveBeenCalledWith('first');
                resolve(null);
              }, 50);
            }, 10);
          }, 50);
        }, 10);
      });
    });
  });
  
  describe('event type', () => {
    test('should treat different event types independently', async () => {
      const callback1 = vi.fn<() => void>();
      const callback2 = vi.fn<() => void>();
      
      messenger.on('event-type-1', callback1);
      messenger.on('event-type-2', callback2);
      
      await new Promise(resolve => {
        setTimeout(() => {
          messenger.emit('event-type-1', 'data1');
          messenger.emit('event-type-2', 'data2');
          
          setTimeout(() => {
            expect(callback1).toHaveBeenCalledWith('data1');
            expect(callback2).toHaveBeenCalledWith('data2');
            resolve(null);
          }, 50);
        }, 10);
      });
    });
    
    test('should support event types with special characters', async () => {
      const callback = vi.fn<() => void>();
      const eventType = 'my-event:sub/path.type';
      
      messenger.on(eventType, callback);
      
      await new Promise(resolve => {
        setTimeout(() => {
          messenger.emit(eventType, 'data');
          
          setTimeout(() => {
            expect(callback).toHaveBeenCalledWith('data');
            resolve(null);
          }, 50);
        }, 10);
      });
    });
  });
});
