import messenger from '@kcuf/messenger';

import {
  MESSAGE_TYPE_LOGIN_SUCCESS,
  MESSAGE_TYPE_LOGIN_ERROR
} from '../const';

/**
 * 通常情况下，我们不需要这个，但如果一个应用里有两个不同实例的 fetcher，两个可能同时被调用，就有可能同时触发登录，
 * 这时候就需要用它在登录动作中使用 messageListenInterceptorLogin 来自动触发登录的返回
 */
export default function messageListenInterceptorLogin(callback: (logged: boolean, payload?: unknown) => void): () => void {
  const offSuccess = messenger.on(MESSAGE_TYPE_LOGIN_SUCCESS, payload => callback(true, payload));
  const offError = messenger.on(MESSAGE_TYPE_LOGIN_ERROR, payload => callback(false, payload));
  
  return () => {
    offSuccess();
    offError();
  };
}
