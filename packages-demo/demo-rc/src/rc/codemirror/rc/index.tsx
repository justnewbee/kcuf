import {
  ReactElement,
  useEffect,
  useState
} from 'react';

import {
  EditorState,
  Compartment
} from '@codemirror/state';
import {
  EditorView
} from '@codemirror/view';
import useControllable from '@kcuf/react-hook-controllable';

import {
  ICodemirrorProps
} from '../types';
import {
  getExtensions
} from '../util';

interface IStateCodemirror {
  state: EditorState;
  view: EditorView;
  readOnlyCompartment: Compartment;
  editableCompartment: Compartment;
}

export default function Codemirror(props: ICodemirrorProps): ReactElement {
  const [stateDom, setStateDom] = useState<HTMLDivElement | null>(null);
  const [, controllableOnChange] = useControllable('', props.defaultValue, props.value, props.onChange);
  const [stateCodemirror, setStateCodemirror] = useState<IStateCodemirror | null>(null);
  
  useEffect(() => {
    if (!stateDom || stateCodemirror) {
      return;
    }
    
    const readOnlyCompartment = new Compartment();
    const editableCompartment = new Compartment();
    
    const extensions = [
      ...getExtensions(props),
      // new Compartment().of(EditorState.tabSize.of(2)),
      readOnlyCompartment.of(EditorState.readOnly.of(!!props.readOnly)),
      editableCompartment.of(EditorView.editable.of(!props.readOnly)),
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
      parent: stateDom,
      state: editorState
    });
    
    setStateCodemirror({
      state: editorState,
      view: editorView,
      readOnlyCompartment,
      editableCompartment
    });
  }, [stateDom, stateCodemirror, setStateCodemirror, props, controllableOnChange]);
  
  useEffect(() => {
    if (stateCodemirror) {
      stateCodemirror.view.dispatch({
        effects: [
          stateCodemirror.readOnlyCompartment.reconfigure(EditorState.readOnly.of(!!props.readOnly)),
          stateCodemirror.editableCompartment.reconfigure(EditorView.editable.of(!props.readOnly))
        ]
      });
    }
  }, [stateCodemirror, props.readOnly]);
  
  // 监听 props.value 变化
  useEffect(() => {
    if (!stateCodemirror?.view) {
      return;
    }
    
    const viewValue = stateCodemirror.view.state.doc.toString();
    
    if (props.value !== viewValue) {
      stateCodemirror.view.dispatch({
        changes: {
          from: 0,
          to: viewValue.length,
          insert: props.value || ''
        }
        // annotations: [External.of(true)],
      });
    }
  }, [props.value, stateCodemirror]);
  
  useEffect(() => {
    return () => stateCodemirror?.view.destroy();
  }, [stateCodemirror]);
  
  return <div ref={setStateDom} />;
}
