import {
  useRef,
  useMemo,
  useEffect
} from 'react';

import useIsUnmounted from '@kcuf-hook/use-is-unmounted';

import {
  TBaseCallback,
  IDebouncedOptions
} from '../types';
import {
  resolveOptions
} from '../util';

export default function useDebouncedCallback<F extends TBaseCallback>(fn: F, options?: number | IDebouncedOptions): F {
  const refFn = useRef<F>(fn);
  const refArgs = useRef<Parameters<F> | null>(null); // 上次调用 `fn` 的参数列表，执行后会被清空
  const refTimeCalled = useRef(0); // 上次调用 `fn` 的时间（但不一定执行）
  const refTimeInvoked = useRef(0); // 上次真正执行 `fn` 的时间
  const refTimerId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isUnmounted = useIsUnmounted();
  
  const {
    delay,
    delayMax,
    immediate
  } = resolveOptions(options);
  
  refFn.current = fn; // always fresh
  
  useEffect(() => {
    return () => {
      if (refTimerId.current) {
        clearTimeout(refTimerId.current);
      }
      
      refTimerId.current = null;
    };
  }, []);
  
  return useMemo((): F => {
    function invokeFn(): void {
      const args = refArgs.current;
      
      if (args) {
        refArgs.current = null;
        refTimeInvoked.current = Date.now();
        
        refFn.current(...args);
      }
    }
    
    function startTimer(pendingFunc: () => void, wait: number): void {
      if (refTimerId.current) {
        clearTimeout(refTimerId.current);
      }
      
      refTimerId.current = setTimeout(pendingFunc, wait);
    }
    
    function timerExpired(): void {
      if (isUnmounted()) {
        return;
      }
      
      if (Date.now() - refTimeCalled.current >= delay) {
        refTimerId.current = null;
        invokeFn();
        
        return;
      }
      
      const time = Date.now();
      const timeSinceLastCall = time - refTimeCalled.current;
      const timeSinceLastInvoke = time - refTimeInvoked.current;
      const timeWaiting = delay - timeSinceLastCall;
      const remainingWait = delayMax >= delay ? Math.min(timeWaiting, delayMax - timeSinceLastInvoke) : timeWaiting;
      
      startTimer(timerExpired, remainingWait);
    }
    
    function callFn(...args: Parameters<F>): void {
      const time = Date.now();
      
      refArgs.current = args;
      refTimeCalled.current = time;
      
      if (immediate && !refTimerId.current) {
        invokeFn();
      }
      
      if (delayMax >= delay && time - refTimeInvoked.current >= delayMax) {
        invokeFn();
        startTimer(timerExpired, delay);
      }
      
      if (!refTimerId.current) {
        startTimer(timerExpired, delay);
      }
    }
    
    return callFn as F;
  }, [delay, delayMax, immediate, isUnmounted]);
}
