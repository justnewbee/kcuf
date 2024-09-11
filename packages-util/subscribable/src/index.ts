import {
  forEach as _forEach,
  map as _map
} from 'lodash-es';

import {
  IFnOff,
  TNamedListeners,
  TSubscribedListeners
} from './types';

/**
 * 对名称和回调参数都定类型的 Subscribable 类，既可直接 new，亦可 extend
 *
 * 注意：传入的 E 泛型，不要用 interface 而应用 type，否则会有报错「does not satisfy the constraint」
 */
export default class Subscribable<O extends TNamedListeners = TNamedListeners> {
  private subscribedInc = 0;
  private subscribedListeners: TSubscribedListeners<O> = {}; // 订阅的集合
  
  /**
   * 发事件，将对绑定的时间逐个进行调用
   */
  emit<T extends keyof O>(topic: T, ...args: Parameters<O[T]>): void {
    const listeners = this.subscribedListeners[topic];
    
    if (!listeners?.length) {
      return;
    }
    
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]?.fn(...args);
    }
  }
  
  on(o: Partial<O>): IFnOff;
  on<T extends keyof O>(topic: T, fn: O[T]): IFnOff;
  
  /**
   * 绑定事件，返回解绑用的无参方法
   */
  on<T extends keyof O>(...args: [Partial<O>] | [T, O[T]]): IFnOff {
    if (typeof args[0] === 'string') {
      const [key, fn] = args;
      const token = this.add(key, fn!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
      
      return () => this.off(token);
    }
    
    const tokens = _map(args[0] as Partial<O>, (fn, k) => {
      return this.add(k, fn as never);
    });
    
    return () => tokens.forEach(v => this.off(v));
  }
  
  /**
   * 清除所有绑定的事件
   */
  offAll(): void {
    this.subscribedListeners = {};
  }
  
  private add<T extends keyof O>(key: T, fn: O[T]): number {
    let listeners = this.subscribedListeners[key];
    
    if (!listeners) {
      listeners = [];
      
      this.subscribedListeners[key] = listeners;
    }
    
    const token = this.subscribedInc++;
    
    listeners.push({
      fn,
      token
    });
    
    return token;
  }
  
  private off(token: number): void {
    _forEach(this.subscribedListeners, listeners => {
      if (!listeners) {
        return;
      }
      
      for (let j = 0; j < listeners.length; j++) {
        if (listeners[j]?.token === token) {
          listeners.splice(j, 1);
        }
      }
    });
  }
}
