import {
  getWindow
} from '@kcuf/sandbox-escape';

import {
  EMessageType
} from '../enum';
import {
  MESSAGE_SOURCE
} from '../const';

export default function messageBroadcast<P>(type: EMessageType, payload: P): void {
  const win = getWindow();
  
  win.postMessage({
    source: MESSAGE_SOURCE,
    type,
    payload
  });
}