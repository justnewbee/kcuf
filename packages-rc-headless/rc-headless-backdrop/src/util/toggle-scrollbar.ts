import {
  getScrollbarWidthOfWindow
} from '@kcuf/mere-dom';

/**
 * 不用 effect，不好处理
 */
export default function toggleScrollbar(visible: boolean): void {
  if (visible) {
    document.documentElement.style.overflow = '';
    document.documentElement.style.paddingRight = '';
  } else {
    const scrollbarWidth = getScrollbarWidthOfWindow(); // 先算好
    
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
  }
}