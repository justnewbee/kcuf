import {
  IClickHijacker
} from './types';
import {
  createClickHandler,
  handleClickHijacker
} from './util';

/**
 * 注册一个容器内的局部劫持点击事件，返回解除劫持的无参方法
 */
export default function hijackClickInDom<T>(container: HTMLElement, hijacker: IClickHijacker<T>, inCapturePhase?: boolean): () => void {
  const fn = createClickHandler((el, e): boolean => {
    return handleClickHijacker<T>(el, e, hijacker);
  }, container);
  
  container.addEventListener('click', fn, inCapturePhase);
  
  return () => container.removeEventListener('click', fn, inCapturePhase);
}
