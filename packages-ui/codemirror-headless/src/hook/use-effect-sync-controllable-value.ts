import {
  useEffect
} from 'react';

import useModelState from './_use-model-state';
import useModelContext from './_use-model-context';

export default function useEffectSyncControllableValue(): void {
  const {
    props: {
      value = '' // 不要监测 controllableValue
    }
  } = useModelContext();
  const {
    codemirror
  } = useModelState();
  
  // 监听 props.value 变化
  useEffect(() => {
    if (!codemirror?.editorView) {
      return;
    }
    
    const viewValue = codemirror.editorView.state.doc.toString();
    
    if (value !== viewValue) {
      codemirror.editorView.dispatch({
        changes: {
          from: 0,
          to: viewValue.length,
          insert: value
        }
        // annotations: [External.of(true)],
      });
    }
  }, [value, codemirror]);
}
