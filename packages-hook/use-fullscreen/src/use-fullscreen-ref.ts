import {
  useState,
  useCallback
} from 'react';

import {
  TUseFullscreenRefResult
} from './types';
import useFullscreen from './use-fullscreen';

export default function useFullscreenRef(): TUseFullscreenRefResult {
  const [stateTarget, setStateTarget] = useState<HTMLElement>(document.documentElement);
  
  const ref = useCallback((element: HTMLElement | null) => {
    setStateTarget(element ?? document.documentElement);
  }, [setStateTarget]);
  
  const useFullscreenResult = useFullscreen(stateTarget);
  
  return [ref, useFullscreenResult];
}
