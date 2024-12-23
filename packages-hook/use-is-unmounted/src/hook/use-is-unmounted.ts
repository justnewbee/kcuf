import {
  useRef,
  useCallback,
  useEffect
} from 'react';

export default function useIsUnmounted(): () => boolean {
  const ref = useRef(false);
  const isUnmounted = useCallback(() => ref.current, []);
  
  useEffect(() => {
    ref.current = false; // 避免 StrictMode 下因其有意触发两次 effect 导致的「误卸载」
    
    return () => {
      ref.current = true;
    };
  }, []);
  
  return isUnmounted;
}
