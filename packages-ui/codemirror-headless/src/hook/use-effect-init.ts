import {
  useRef,
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
import useDispatchSetCodemirrorInfo from './use-dispatch-set-codemirror-info';

export default function useEffectInit(): void {
  const refInitialized = useRef(false);
  const {
    refDom,
    props,
    controllableOnChange
  } = useModelContext();
  const dispatchSetCodemirrorInfo = useDispatchSetCodemirrorInfo();
  
  useEffect(() => {
    if (!refDom.current || refInitialized.current) {
      return;
    }
    
    refInitialized.current = true;
    
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
    
    dispatchSetCodemirrorInfo({
      editorState,
      editorView,
      compartmentReadOnly,
      compartmentEditable
    });
  }, [props, refDom, controllableOnChange, dispatchSetCodemirrorInfo]);
}
