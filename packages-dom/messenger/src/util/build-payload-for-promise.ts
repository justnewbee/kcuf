import {
  IMessengerPayloadPromise
} from '../types';

export default function buildPayloadForPromise<P = unknown>(type: string, payload: P): IMessengerPayloadPromise<P> {
  // 生成一个事件 type，用于 onPromise 里进行事件回调，因为 `postMessage` 无法传输 function，
  // 所以只好经由这种「曲线救国」的方式。
  return {
    _dismiss_: `${type}/end/${Date.now()}-${Math.round(Math.random() * 100000)}`,
    payload
  };
}
