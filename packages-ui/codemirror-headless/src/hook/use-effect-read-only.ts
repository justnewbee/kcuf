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
    codemirror
  } = useModelState();
  
  useEffect(() => {
    if (codemirror) {
      codemirror.editorView.dispatch({
        effects: [
          codemirror.compartmentReadOnly.reconfigure(EditorState.readOnly.of(!!readOnly)),
          codemirror.compartmentEditable.reconfigure(EditorView.editable.of(!readOnly))
        ]
      });
    }
  }, [codemirror, readOnly]);
}
