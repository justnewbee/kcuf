import type {
  ISlsLogPayload,
  ISlsPostBody
} from '../types';
import {
  TOPIC_MERGED
} from '../const';

import convertLogInfo from './convert-log-info';

/**
 * 利用 PutWebTracking 发送日志，如果 `__logs__` 里含有 `__topic__` 则，外部的这个 `__topic__` 将被改为 `__topic__0`，
 * 为了干净，在仅发送一条日志的时候，将 `__logs__` 里的 `__topic__` 往上提。
 *
 * 但是，POST 的时候 `__source__` 不会被默认填充成 IP，IP 在 `__tag__:__client_ip__`（GET 方式也有）
 */
export default function buildPostBody(payloads: ISlsLogPayload[]): ISlsPostBody {
  let topic = TOPIC_MERGED;
  
  if (payloads.length === 1) {
    topic = payloads[0]!.__topic__; // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }
  
  return {
    __topic__: topic,
    __logs__: payloads.map(convertLogInfo)
  };
}