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
    codemirrorInfo
  } = useModelState();
  
  // 监听 props.value 变化
  useEffect(() => {
    if (!codemirrorInfo?.editorView) {
      return;
    }
    
    const viewValue = codemirrorInfo.editorView.state.doc.toString();
    
    if (value !== viewValue) {
      codemirrorInfo.editorView.dispatch({
        changes: {
          from: 0,
          to: viewValue.length,
          insert: value
        }
        // annotations: [External.of(true)],
      });
    }
  }, [value, codemirrorInfo]);
}
