import {
  useEffect
} from 'react';

import useHandleDocumentFullscreenChange from './use-handle-document-fullscreen-change';

export default function useEffectDocumentFullscreen(): void {
  const handleDocumentFullscreenChange = useHandleDocumentFullscreenChange();
  
  useEffect(() => {
    document.addEventListener('fullscreenchange', handleDocumentFullscreenChange);

    return (): void => document.removeEventListener('fullscreenchange', handleDocumentFullscreenChange);
  }, [handleDocumentFullscreenChange]);
}
