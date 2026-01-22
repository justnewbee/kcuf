import {
  MESSAGE_TYPE_LOGIN_SUCCESS,
  MESSAGE_TYPE_LOGIN_ERROR
} from '../const';

interface IMessageEventData {
  source?: string;
  type?: string;
  payload: unknown;
}

/**
 * 通常情况下，我们不需要这个，但如果一个应用里有两个不同实例的 fetcher，两个可能同时被调用，就有可能同时触发登录，
 * 这时候就需要用它在登录动作中使用 messageListenInterceptorLogin 来自动触发登录的返回
 */
export default function messageListenInterceptorLogin(callback: (logged: boolean, info?: unknown) => void): () => void {
  function listener(e: MessageEvent<IMessageEventData | undefined>): void {
    if (!e.data || typeof e.data !== 'object') {
      return;
    }
    
    if (e.data.type === MESSAGE_TYPE_LOGIN_SUCCESS) {
      callback(true, e.data.payload);
    } else if (e.data.type === MESSAGE_TYPE_LOGIN_ERROR) {
      callback(false, e.data.payload);
    }
  }
  
  window.addEventListener('message', listener);
  
  return () => window.removeEventListener('message', listener);
}
