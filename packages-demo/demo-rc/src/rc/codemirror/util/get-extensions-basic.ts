import {
  EditorState,
  Extension
} from '@codemirror/state';
import {
  EditorView,
  drawSelection,
  crosshairCursor,
  dropCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  lineNumbers,
  rectangularSelection,
  keymap
} from '@codemirror/view';
import {
  indentWithTab,
  history,
  historyKeymap,
  defaultKeymap
} from '@codemirror/commands';
import {
  bracketMatching,
  foldGutter,
  indentOnInput,
  syntaxHighlighting,
  foldKeymap,
  defaultHighlightStyle
} from '@codemirror/language';
import {
  highlightSelectionMatches,
  searchKeymap
} from '@codemirror/search';
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap
} from '@codemirror/autocomplete';
import {
  lintKeymap
} from '@codemirror/lint';

/**
 * 基础插件，没有 theme 和 language
 */
export default function getExtensionsBasic(): Extension[] {
  return [
    lineNumbers(),
    EditorView.lineWrapping,
    highlightActiveLineGutter(),
    highlightSpecialChars(),
    highlightActiveLine(),
    highlightSelectionMatches(),
    history(),
    foldGutter({
      openText: '↘',
      closedText: '→'
    }),
    drawSelection(),
    dropCursor(),
    crosshairCursor(),
    indentOnInput(),
    syntaxHighlighting(defaultHighlightStyle, {
      fallback: true
    }),
    bracketMatching(),
    closeBrackets(),
    autocompletion(),
    rectangularSelection(),
    EditorState.allowMultipleSelections.of(true),
    keymap.of([
      indentWithTab,
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap,
      ...foldKeymap,
      ...completionKeymap,
      ...lintKeymap
    ])
  ];
}
