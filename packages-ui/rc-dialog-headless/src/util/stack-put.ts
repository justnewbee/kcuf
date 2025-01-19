import {
  IStackItem
} from '../types';

import stackGet from './stack-get';
import handleKeydownEsc from './handle-keydown-esc';
import handleKeyDownTrapTab from './handle-key-down-trap-tab';
import doBackdropAndZIndex from './do-backdrop-and-z-index';

export default function stackPut(dialogId: string, o: IStackItem): void {
  const n = stackGet().put(dialogId, o);
  
  doBackdropAndZIndex();
  
  if (n < 0) {
    return;
  }
  
  if (n === 1) {
    document.addEventListener('keydown', handleKeydownEsc, true);
    document.addEventListener('keydown', handleKeyDownTrapTab, true);
  }
}
