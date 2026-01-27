import {
  TMessengerOff,
  IMessageData,
  TMessengerCallback,
  TMessengerReceiverMap,
  IMessengerEmitOptions,
  IMessengerPayloadPromise,
  IMessengerPayloadPromiseBack,
  IMessengerReceiver
} from '../types';
import {
  buildPayloadForPromise,
  errorToPlain,
  getTargetWindow,
  plainToError
} from '../util';

/**
 * 封装 `postMessage`，全局只有一个监听事件
 */
export default class Messenger {
  private messageReceiverMap: TMessengerReceiverMap = {};
  
  constructor() {
    const thisWindow = getTargetWindow();
    
    thisWindow.addEventListener('message', (e: MessageEvent<IMessageData | undefined>): void => {
      if (!e.data?.type) {
        return;
      }
      
      const {
        type,
        payload
      } = e.data;
      const [receivers, receiversOnce] = this.getReceivers(type);
      
      receivers.forEach(v => v.fn(payload));
      receiversOnce.forEach(v => v.fn(payload));
      
      receiversOnce.forEach(v => this.removeReceiver(type, v));
    });
  }
  
  /**
   * 广播消息，当传入的对象 payload 不是 plain 对象的时候（如 Error、function、DOMElement、JSX 等），这里会报错
   * 「Uncaught DOMException: The object could not be cloned.」或 「DataCloneError: The object could not be cloned.」
   * 这个错误不能吃掉，因为使用者需要同步地知道调用失败了
   */
  emit(type: string): void;
  emit(type: string, payload: undefined, options: IMessengerEmitOptions): void;
  emit<P = unknown>(type: string, payload: P, options?: IMessengerEmitOptions): void; // eslint-disable-line @typescript-eslint/no-unnecessary-type-parameters
  emit(type: string, payload?: unknown, options: IMessengerEmitOptions = {}): void {
    const theWindow = getTargetWindow(options.targetWindow);
    
    theWindow.postMessage({
      type,
      payload
    }, options.targetOrigin ?? theWindow.location.origin);
  }
  
  /**
   * 广播事件，返回 Promise，必须要有 `onPromise` 来承接该事件，否则此 `Promise` 将永远无法结束
   */
  emitPromise<T = void>(type: string): Promise<T>;
  emitPromise<T = void>(type: string, payload: undefined, options: IMessengerEmitOptions): Promise<T>;
  emitPromise<T = void, P = unknown>(type: string, payload: P, options?: IMessengerEmitOptions): Promise<T>; // eslint-disable-line @typescript-eslint/no-unnecessary-type-parameters
  emitPromise<T = void, P = unknown>(type: string, payload?: P, options?: IMessengerEmitOptions): Promise<T> {
    const payloadForPromise = buildPayloadForPromise<P | undefined>(type, payload);
    
    // 触发 `onPromise` 的回调，不要放到 `new Promise` 内部，因为它可能会报错，这个错需要保持是同步的
    this.emit<IMessengerPayloadPromise<P | undefined>>(type, payloadForPromise, options);
    
    return new Promise<T>((resolve, reject) => {
      // `onPromise` 的回调返回的是 `Promise`，它 `resolve` 或 `reject` 都会广播一个以 `_dismiss_` 为类型的 `message`，
      // 这里使用单次订阅是因为这个 `message` 只需要消费一次。
      this.once<IMessengerPayloadPromiseBack<T>>(payloadForPromise._dismiss_, (payloadBack?: IMessengerPayloadPromiseBack<T>): void => {
        if (!payloadBack) { // 一般来说不可能没有 payloadBack，但代码需要严谨
          reject(new Error('Messenger:emitPromise MessengerPayloadPromiseBack is missing.'));
          
          return;
        }
        
        const {
          value,
          error
        } = payloadBack;
        
        if (error) {
          reject(plainToError(error));
        } else {
          resolve(value as T);
        }
      });
    });
  }
  
  /**
   * 注册回调，返回用于注销的方法
   */
  on<P = unknown>(type: string, fn: (payload?: P) => void): TMessengerOff { // eslint-disable-line @typescript-eslint/no-unnecessary-type-parameters
    return this.addReceiver(type, fn);
  }
  
  /**
   * 注册单次回调，运行一次后将自动注销
   */
  once<P = unknown>(type: string, fn: (payload?: P) => void): TMessengerOff { // eslint-disable-line @typescript-eslint/no-unnecessary-type-parameters
    return this.addReceiver(type, fn, true);
  }
  
  /**
   * 对 emitPromise 对应的 type 进行响应，这里关心的 payload 还是 emitPromise 所传入的 payload
   */
  onPromise<T, P = unknown>(type: string, fn: (payload?: P) => T | Promise<T>): TMessengerOff { // eslint-disable-line @typescript-eslint/no-unnecessary-type-parameters
    return this.on(type, (payload?: IMessengerPayloadPromise<P>) => {
      if (!payload?._dismiss_) { // 得到的 payload 下有 _dismiss_ 参数才响应，否则 pass
        return;
      }
      
      // 这里广播是事件会被 `emitPromise` 方法内部的 once 消化
      Promise.resolve(fn(payload.payload)).then((value: T) => {
        this.emit<IMessengerPayloadPromiseBack<T>>(payload._dismiss_, {
          value
        });
      }, (err: unknown) => {
        this.emit<IMessengerPayloadPromiseBack<T>>(payload._dismiss_, {
          error: errorToPlain(err)
        });
      });
    });
  }
  
  private getReceivers(type: string): [IMessengerReceiver[], IMessengerReceiver[]] {
    const receiversForType = this.messageReceiverMap[type];
    const receiversTuple: [IMessengerReceiver[], IMessengerReceiver[]] = [[], []];
    
    return receiversForType?.reduce((result: [IMessengerReceiver[], IMessengerReceiver[]], v) => {
      if (v.once) {
        result[1].push(v);
      } else {
        result[0].push(v);
      }
      
      return result;
    }, receiversTuple) ?? receiversTuple;
  }
  
  private addReceiver(type: string, fn: unknown, once?: boolean): TMessengerOff {
    if (typeof fn !== 'function') {
      throw new Error('Messenger:addReceiver: fn is not a function');
    }
    
    let receivers = this.messageReceiverMap[type];
    
    if (!receivers) {
      receivers = [];
      this.messageReceiverMap[type] = receivers;
    }
    
    const receiver: IMessengerReceiver = {
      fn: fn as TMessengerCallback,
      once
    };
    
    receivers.push(receiver);
    
    return () => this.removeReceiver(type, receiver);
  }
  
  private removeReceiver(type: string, receiver: IMessengerReceiver): void {
    const receivers = this.messageReceiverMap[type];
    
    if (!receivers) {
      return;
    }
    
    const index = receivers.indexOf(receiver);
    
    if (index >= 0) {
      receivers.splice(index, 1);
    }
    
    if (!receivers.length) {
      delete this.messageReceiverMap[type]; // eslint-disable-line @typescript-eslint/no-dynamic-delete
    }
  };
}
