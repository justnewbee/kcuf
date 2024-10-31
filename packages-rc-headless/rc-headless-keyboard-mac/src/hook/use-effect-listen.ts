import {
  useEffect
} from 'react';

import {
  EKeyboardCode
} from '../enum';

import useModelProps from './_use-model-props';
import useDispatchSetCapsLock from './use-dispatch-set-caps-lock';
import useDispatchPushActiveCode from './use-dispatch-push-active-code';
import useDispatchPullActiveCode from './use-dispatch-pull-active-code';

export default function useEffectListen(): void {
  const {
    listen
  } = useModelProps();
  const dispatchSetCapsLock = useDispatchSetCapsLock();
  const dispatchPushActiveCode = useDispatchPushActiveCode();
  const dispatchPullActiveCode = useDispatchPullActiveCode();
  
  useEffect(() => {
    if (!listen) {
      return;
    }
    
    let timer: ReturnType<typeof setTimeout> | null;
    
    function onKeyDown(e: KeyboardEvent): void {
      const code = e.code as EKeyboardCode;
      
      dispatchPushActiveCode(code);
      dispatchSetCapsLock(e.getModifierState('CapsLock'));
      
      if (timer) {
        clearTimeout(timer);
      }
      
      // 浏览器的一些快捷键响应会导致 keyup 无法触发，比如 Tab、CapsLock、/、" 等键，因此不用 keyup 来清理
      timer = setTimeout(() => {
        dispatchPullActiveCode(code);
        timer = null;
      }, 250);
    }
    
    document.addEventListener('keydown', onKeyDown);
    
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      
      if (timer) {
        clearTimeout(timer);
        
        timer = null;
      }
    };
  }, [listen, dispatchSetCapsLock, dispatchPushActiveCode, dispatchPullActiveCode]);
}
