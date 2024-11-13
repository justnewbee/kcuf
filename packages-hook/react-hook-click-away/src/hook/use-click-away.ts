import {
  MutableRefObject,
  useRef,
  useLayoutEffect,
  useEffect
} from 'react';

type ICallback = (e: MouseEvent) => void;

export default function useClickAway<E extends Element>(callback: ICallback): MutableRefObject<E | null> {
  const refElement = useRef<E>(null);
  const refCallback = useRef<ICallback>(callback);
  
  useLayoutEffect(() => {
    refCallback.current = callback;
  });
  
  useEffect(() => {
    function handler(e: MouseEvent): void {
      const element = refElement.current;
      
      if (element && !element.contains(e.target as Element)) {
        refCallback.current(e);
      }
    }
    
    document.addEventListener('mousedown', handler);
    
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  
  return refElement;
}
