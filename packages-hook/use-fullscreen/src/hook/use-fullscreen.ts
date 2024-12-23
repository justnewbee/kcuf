import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import {
  fullscreenElement,
  fullscreenEnter,
  fullscreenExit,
  fullscreenListen
} from '../util';

export default function useFullscreen<T extends HTMLElement = any>() {
  const [stateFullscreen, setStateFullscreen] = useState<boolean>(false);
  
  const _ref = useRef<T>();
  
  const handleFullscreenChange = useCallback((event: Event) => {
    setStateFullscreen(event.target === fullscreenElement());
  }, [setStateFullscreen]);
  
  const handleFullscreenError = useCallback(() => {
    setStateFullscreen(false);
  }, [setStateFullscreen]);
  
  const toggle = useCallback(async () => {
    if (!fullscreenElement()) {
      await fullscreenEnter(_ref.current!);
    } else {
      await fullscreenExit();
    }
  }, []);
  
  const ref = useCallback((element: T | null) => {
    if (element === null) {
      _ref.current = window.document.documentElement as T;
    } else {
      _ref.current = element;
    }
  }, []);
  
  useEffect(() => {
    if (!_ref.current && window.document) {
      _ref.current = window.document.documentElement as T;
      
      return fullscreenListen(_ref.current, {
        onFullscreen: handleFullscreenChange,
        onError: handleFullscreenError
      });
    }
    
    if (_ref.current) {
      return fullscreenListen(_ref.current, {
        onFullscreen: handleFullscreenChange,
        onError: handleFullscreenError
      });
    }
    
    return undefined;
  }, [handleFullscreenChange, handleFullscreenError]);
  
  return {
    ref,
    toggle,
    fullscreen: stateFullscreen
  } as const;
}
