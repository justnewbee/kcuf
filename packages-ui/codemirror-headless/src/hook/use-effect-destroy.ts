import {
  useEffect
} from 'react';

import useModelState from './_use-model-state';

export default function useEffectDestroy(): void {
  const {
    codemirror
  } = useModelState();
  
  useEffect(() => {
    return () => codemirror?.editorView.destroy();
  }, [codemirror]);
}
