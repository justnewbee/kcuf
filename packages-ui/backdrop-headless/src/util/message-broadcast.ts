import {
  getWindow
} from '@kcuf/sandbox-escape';

import {
  EMessageType
} from '../enum';
import {
  MESSAGE_SOURCE
} from '../const';

export default function messageBroadcast(type: EMessageType, payload: unknown): void {
  const win = getWindow();
  
  win.postMessage({
    source: MESSAGE_SOURCE,
    type,
    payload
  }, location.origin);
}
