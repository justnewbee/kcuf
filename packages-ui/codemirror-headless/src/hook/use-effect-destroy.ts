import {
  useEffect
} from 'react';

import useModelState from './_use-model-state';

export default function useEffectDestroy(): void {
  const {
    codemirrorInfo
  } = useModelState();
  
  useEffect(() => {
    return () => codemirrorInfo?.editorView.destroy();
  }, [codemirrorInfo]);
}
