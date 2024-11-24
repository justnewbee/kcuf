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
    
    const timers: Record<string, ReturnType<typeof setTimeout>> = {};
    
    function onKeyDown(e: KeyboardEvent): void {
      const code = e.code as EKeyboardCode;
      const timer = timers[code];
      
      dispatchPushActiveCode(code);
      dispatchSetCapsLock(e.getModifierState('CapsLock'));
      
      if (timer) {
        clearTimeout(timer);
      }
      
      // 浏览器的一些快捷键响应会导致 keyup 无法触发，比如 Tab、CapsLock、/、" 等键，因此不用 keyup 来清理
      timers[code] = setTimeout(() => {
        dispatchPullActiveCode(code);
        delete timers[code];
      }, 300); // 按住不放的话，会先触发这个 timeout（大概按住不放会经过 500ms 后开始发第二次 keydown 事件）
    }
    
    document.addEventListener('keydown', onKeyDown);
    
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      
      Object.keys(timers).forEach(v => {
        const timer = timers[v];
        
        if (timer) {
          clearTimeout(timer);
        }
        
        delete timers[v];
      });
    };
  }, [listen, dispatchSetCapsLock, dispatchPushActiveCode, dispatchPullActiveCode]);
}
