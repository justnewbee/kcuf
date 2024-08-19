import {
  IBackdropSingletonItem
} from '../types';

import singletonGlobal from './singleton-global';

/**
 * 获取展示的 item，即 z-index 最高的那个（如果 z-index 一样，则后入者高）
 */
export default function singletonGetVisibleItem(): IBackdropSingletonItem | undefined {
  const {
    items = []
  } = singletonGlobal();
  let visibleItem: IBackdropSingletonItem | undefined;
  let visibleIndex = -1;
  
  for (let i = items.length - 1; i >= 0; i--) {
    const v = items[i];
    
    if (v && v.zIndex > visibleIndex) {
      visibleItem = v;
      visibleIndex = v.zIndex;
    }
  }
  
  return visibleItem;
}