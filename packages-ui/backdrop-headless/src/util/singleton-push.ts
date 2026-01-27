import {
  IBackdropSingletonItem
} from '../types';
import {
  DEFAULT_Z_INDEX
} from '../const';

import singletonGlobal from './singleton-global';
import messageEmitRefresh from './message-emit-refresh';
import toggleScrollbar from './toggle-scrollbar';

export default function singletonPush(zIndex = DEFAULT_Z_INDEX): number {
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
    zIndex
  };
  
  if (n === 1) {
    toggleScrollbar(false);
  }
  
  items.push(item);
  messageEmitRefresh(n);
  
  return n;
}
