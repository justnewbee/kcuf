import {
  useState,
  useEffect
} from 'react';

import {
  IUseFullscreenResult
} from './types';

export default function useFullscreen(target: HTMLElement | null = document.documentElement): IUseFullscreenResult {
  const [stateFullscreen, setStateFullscreen] = useState<boolean>(target ? document.fullscreenElement === target : false);
  
  const toggle = async (): Promise<void> => {
    if (!target) {
      return;
    }
    
    if (document.fullscreenElement === target) {
      await document.exitFullscreen();
    } else {
      await target.requestFullscreen();
    }
  };
  
  useEffect(() => {
    if (!target) {
      return;
    }
    
    const handleFullscreenChange = (e: Event): void => {
      setStateFullscreen(e.target === document.fullscreenElement);
    };
    
    target.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => target.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [target, setStateFullscreen]);
  
  return {
    target,
    enabled: document.fullscreenEnabled,
    fullscreen: stateFullscreen,
    toggle
  };
}
