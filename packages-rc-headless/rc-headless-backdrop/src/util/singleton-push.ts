import {
  IModelProps,
  IBackdropSingletonItem
} from '../types';
import {
  DEFAULT_Z_INDEX
} from '../const';

import singletonGlobal from './singleton-global';
import messageBroadcastRefresh from './message-broadcast-refresh';
import toggleScrollbar from './toggle-scrollbar';

export default function singletonPush(props: IModelProps): number {
  const o = singletonGlobal();
  let {
    n = 0,
    items
  } = o;
  
  n += 1;
  o.n = n;
  
  if (!items) {
    items = [];
    o.items = items;
  }
  
  const item: IBackdropSingletonItem = {
    n,
    zIndex: props.zIndex ?? DEFAULT_Z_INDEX
  };
  
  if (n === 1) {
    toggleScrollbar(false);
  }
  
  items.push(item);
  messageBroadcastRefresh(n);
  
  return n;
}