export type TTargetWindow = Window | 'top' | 'parent';

export interface IMessageData {
  type: string;
  payload: never;
}

export interface IMessengerEmitOptions {
  targetWindow?: TTargetWindow;
  targetOrigin?: string;
}

export type TMessengerCallback<P = unknown> = (payload?: P) => void;

export interface IMessengerReceiver<P = never> {
  fn: TMessengerCallback<P>;
  once?: boolean;
  // priority?: number; // 优先级，越大越优先
}

/**
 * 为每个 MessageEvent.data 的 `type`，建立一个接收序列
 */
export type TMessengerReceiverMap = Record<string, IMessengerReceiver[]>;

/**
 * 以 Promise 的形式广播事件的时候的 payload 包裹
 */
export interface IMessengerPayloadPromise<P = void> {
  _dismiss_: string; // onPromise 中会将此包裹打开，如果里边有该值，表明此事件合法，否则不会响应
  payload: P; // 原 payload
}

/**
 * `emitPromise` 和 `onPromise` 的纽带
 */
export interface IMessengerPayloadPromiseBack<T> {
  value?: T;
  error?: Record<string, unknown>; // 可能是 string、对象或 Error
}

export type TMessengerOff = () => void;
