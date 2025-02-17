import {
  useCallback
} from 'react';

import useModelState from './_use-model-state';

export default function useHandleToggleFullscreen(): () => void {
  const {
    fullscreen,
    domContainer
  } = useModelState();
  
  return useCallback(() => {
    if (fullscreen) {
      document.exitFullscreen().catch(() => console.error('Failed: exitFullscreen')); // eslint-disable-line no-console
    } else {
      domContainer?.requestFullscreen().catch(() => console.error('Failed: requestFullscreen')); // eslint-disable-line no-console
    }
  }, [domContainer, fullscreen]);
}
