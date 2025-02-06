import {
  IClickHijacker
} from './types';
import {
  GLOBAL_CLICK_HIJACKERS
} from './const';
import {
  createClickHandler,
  handleClickGlobal
} from './util';

let registered = false;

/**
 * 注册一个全局劫持点击的事件，返回解除劫持的无参方法
 */
export default function hijackClickGlobal<T>(hijacker: IClickHijacker<T>): () => void {
  if (!registered) { // 全局劫持就靠这句代码，使用捕获阶段
    window.addEventListener('click', createClickHandler(handleClickGlobal, document.body), true);
    
    registered = true;
  }
  
  if (!GLOBAL_CLICK_HIJACKERS.includes(hijacker)) { // 避免同一个对象多次注册
    GLOBAL_CLICK_HIJACKERS.push(hijacker);
  }
  
  return (): void => {
    const index = GLOBAL_CLICK_HIJACKERS.findIndex(v => v === hijacker);
    
    if (index >= 0) {
      GLOBAL_CLICK_HIJACKERS.splice(index, 1);
    }
  };
}
