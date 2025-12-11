import {
  useEffect
} from 'react';

import {
  Compartment,
  EditorState
} from '@codemirror/state';
import {
  EditorView
} from '@codemirror/view';

import {
  getExtensions
} from '../util';

import useModelContext from './_use-model-context';
import useDispatchInit from './use-dispatch-init';

export default function useEffectInit(): void {
  const {
    refDom,
    props,
    state: {
      codemirror
    },
    controllableOnChange
  } = useModelContext();
  const dispatchInit = useDispatchInit();
  
  useEffect(() => {
    if (!refDom.current || codemirror) {
      return;
    }
    
    const compartmentReadOnly = new Compartment();
    const compartmentEditable = new Compartment();
    
    const extensions = [
      ...getExtensions(props),
      // new Compartment().of(EditorState.tabSize.of(2)),
      compartmentReadOnly.of(EditorState.readOnly.of(!!props.readOnly)),
      compartmentEditable.of(EditorView.editable.of(!props.readOnly)),
      EditorView.updateListener.of(viewUpdate => {
        if (viewUpdate.docChanged) {
          controllableOnChange(viewUpdate.state.doc.toString());
        }
      })
    ];
    
    const editorState = EditorState.create({
      doc: props.value,
      extensions
    });
    
    const editorView = new EditorView({
      parent: refDom.current,
      state: editorState
    });
    
    dispatchInit({
      editorState,
      editorView,
      compartmentReadOnly,
      compartmentEditable
    });
  }, [props, refDom, controllableOnChange, codemirror, dispatchInit]);
}
