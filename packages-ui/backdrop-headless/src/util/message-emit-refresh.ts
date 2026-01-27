import messenger from '@kcuf/messenger';

import {
  EMessageType
} from '../enum';

export default function messageEmitRefresh(n: number): void {
  messenger.emit<number>(EMessageType.REFRESH, n);
}
