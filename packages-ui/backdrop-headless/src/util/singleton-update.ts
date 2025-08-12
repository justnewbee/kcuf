import {
  DEFAULT_Z_INDEX
} from '../const';

import singletonGlobal from './singleton-global';
import messageBroadcastRefresh from './message-broadcast-refresh';

export default function singletonUpdate(n: number, zIndex = DEFAULT_Z_INDEX): void {
  const item = singletonGlobal().items?.find(v => v.n === n);
  
  if (item && item.zIndex !== zIndex) {
    item.zIndex = zIndex;
    
    messageBroadcastRefresh(n);
  }
}
