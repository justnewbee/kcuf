import {
  useCallback
} from 'react';

import useDispatchToggleFullscreen from './use-dispatch-toggle-fullscreen';

export default function useHandleDocumentFullscreenChange(): () => void {
  const dispatchToggleFullscreen = useDispatchToggleFullscreen();
  
  return useCallback(() => {
    dispatchToggleFullscreen(!!document.fullscreenElement);
  }, [dispatchToggleFullscreen]);
}