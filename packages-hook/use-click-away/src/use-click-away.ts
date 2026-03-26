import {
  RefObject,
  useRef,
  useLayoutEffect,
  useEffect
} from 'react';

/**
 * Registers a listener to the document to help you get notified when click away.
 *
 * @param callback - The callback function called on click-away
 * @param ignore - The optional selector which can be ignored when click away
 **/
export default function useClickAway<E extends Element = HTMLDivElement>(callback: (e: MouseEvent) => void, ignore = '[data-click-away-ignore]'): RefObject<E | null> {
  const refElement = useRef<E>(null);
  const refCallback = useRef(callback);
  
  useLayoutEffect(() => {
    refCallback.current = callback;
  }, [callback]);
  
  useEffect(() => {
    function handler(e: MouseEvent): void {
      const element = refElement.current;
      const target = e.target as Element;
      
      if (element && !element.contains(target) && (ignore && !target.closest(ignore))) {
        refCallback.current(e);
      }
    }
    
    document.addEventListener('mousedown', handler); // 不能用 click，否则可能导致出来就消失
    
    return () => document.removeEventListener('mousedown', handler);
  }, [ignore]);
  
  return refElement;
}
