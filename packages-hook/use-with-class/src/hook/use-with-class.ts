import {
  useState,
  useEffect
} from 'react';

import {
  hasClass
} from '@kcuf/mere-dom';

/**
 * 利用 MutationObserver 动态监听元素是否有 className
 */
export default function useWithClass(target: HTMLElement, className: string): boolean {
  const [stateWithClass, setStateWithClass] = useState<boolean>(hasClass(target, className));
  
  const mutationObserver = ((): MutationObserver | null => {
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    if (typeof MutationObserver !== 'function') {
      return null;
    }
    
    return new MutationObserver((mutations: MutationRecord[]) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          setStateWithClass(hasClass(target, className));
        }
      }
    });
  })();
  
  useEffect(() => {
    if (mutationObserver) {
      mutationObserver.observe(target, {
        attributes: true
      });
      
      return () => mutationObserver.disconnect();
    }
  }, [target, mutationObserver]);
  
  return stateWithClass;
}
