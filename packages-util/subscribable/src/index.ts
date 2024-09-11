import {
  forEach as _forEach
} from 'lodash-es';

import {
  TEventMap,
  TListenerMapping
} from './types';

/**
 * 对名称即回调参数都有限定的 Subscribable 类，既可直接 new，亦可 extend
 *
 * 注意：传入的 E 泛型，不要用 interface 而应用 type，否则会有报错「does not satisfy the constraint」
 */
export default class Subscribable<E extends TEventMap = TEventMap> {
  private subscribedInc = 0;
  private subscribedListeners: TListenerMapping<E> = {}; // 订阅的集合
  
  /**
   * 发事件，将对绑定的时间逐个进行调用
   */
  emit<K extends keyof E>(key: K, ...args: E[K]): void {
    const listeners = this.subscribedListeners[key];
    
    if (!listeners?.length) {
      return;
    }
    
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]?.fn(...args);
    }
  }
  
  /**
   * 绑定事件，返回解绑用的无参方法
   */
  on<K extends keyof E>(key: K, fn: (...args: E[K]) => void): () => void {
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
    
    return () => this.off(token);
  }
  
  /**
   * 清除所有绑定的事件
   */
  clear(): void {
    this.subscribedListeners = {};
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
