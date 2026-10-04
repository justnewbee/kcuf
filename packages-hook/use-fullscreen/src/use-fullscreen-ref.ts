import {
  useState
} from 'react';

import {
  TUseFullscreenRefResult
} from './types';
import useFullscreen from './use-fullscreen';

export default function useFullscreenRef(): TUseFullscreenRefResult {
  const [stateTarget, setStateTarget] = useState<HTMLElement>(document.documentElement);
  
  const ref = (element: HTMLElement | null): void => {
    setStateTarget(element ?? document.documentElement);
  };
  
  const fullscreenResult = useFullscreen(stateTarget);
  
  return [ref, fullscreenResult];
}
