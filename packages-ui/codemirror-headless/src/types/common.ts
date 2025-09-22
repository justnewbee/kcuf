import {
  Compartment,
  EditorState
} from '@codemirror/state';
import {
  EditorView
} from '@codemirror/view';

export interface ICodemirrorInfo {
  editorState: EditorState;
  editorView: EditorView;
  compartmentReadOnly: Compartment;
  compartmentEditable: Compartment;
}
