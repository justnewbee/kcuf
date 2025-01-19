import stackGet from './stack-get';
import handleKeydownEsc from './handle-keydown-esc';
import handleKeyDownTrapTab from './handle-key-down-trap-tab';
import doBackdropAndZIndex from './do-backdrop-and-z-index';

export default function stackPull(dialogId: string): void {
  const n = stackGet().remove(dialogId);
  
  doBackdropAndZIndex();
  
  if (n < 0) {
    return;
  }
  
  if (n === 0) {
    document.removeEventListener('keydown', handleKeydownEsc, true);
    document.removeEventListener('keydown', handleKeyDownTrapTab, true);
  }
}
