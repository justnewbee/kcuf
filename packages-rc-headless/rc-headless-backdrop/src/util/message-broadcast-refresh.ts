import {
  EMessageType
} from '../enum';

import messageBroadcast from './message-broadcast';

export default function messageBroadcastRefresh(n: number): void {
  messageBroadcast<number>(EMessageType.REFRESH, n);
}