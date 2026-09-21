import {
  RefObject,
  useRef,
  useLayoutEffect,
  useEffect
} from 'react';

import {
  DATA_KEY_CLICK_AWAY_IGNORE
} from './const';

/**
 * Registers a listener to the document to help you get notified when click away.
 *
 * @param callback - The callback function called on click-away
 * @param ignore - The optional value for `data-click-away-ignore`
 **/
export default function useClickAway<E extends Element = HTMLDivElement>(callback: (e: MouseEvent) => void, ignore?: string): RefObject<E | null> {
  const elRef = useRef<E>(null);
  const callbackRef = useRef(callback);
  
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  useEffect(() => {
    const ignoreSelector = ignore ? `[${DATA_KEY_CLICK_AWAY_IGNORE}="${ignore}"]` : `[${DATA_KEY_CLICK_AWAY_IGNORE}]`;
    
    function handler(e: MouseEvent): void {
      const element = elRef.current;
      const target = e.target as Element;
      
      if (element && !element.contains(target) && !target.closest(ignoreSelector)) {
        callbackRef.current(e);
      }
    }
    
    document.addEventListener('mousedown', handler); // 不能用 click，否则可能导致出来就消失
    
    return () => document.removeEventListener('mousedown', handler);
  }, [ignore]);
  
  return elRef;
}
