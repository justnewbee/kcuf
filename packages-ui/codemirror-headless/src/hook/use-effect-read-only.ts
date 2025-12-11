import {
  useEffect
} from 'react';

import {
  EditorState
} from '@codemirror/state';
import {
  EditorView
} from '@codemirror/view';

import useModelState from './_use-model-state';
import useModelProps from './_use-model-props';

export default function useEffectReadOnly(): void {
  const {
    readOnly
  } = useModelProps();
  const {
    codemirrorInfo
  } = useModelState();
  
  useEffect(() => {
    if (codemirrorInfo) {
      codemirrorInfo.editorView.dispatch({
        effects: [
          codemirrorInfo.compartmentReadOnly.reconfigure(EditorState.readOnly.of(!!readOnly)),
          codemirrorInfo.compartmentEditable.reconfigure(EditorView.editable.of(!readOnly))
        ]
      });
    }
  }, [codemirrorInfo, readOnly]);
}
