import {
  Extension
} from '@codemirror/state';
import {
  EditorView
} from '@codemirror/view';

const LINE_HEIGHT = 18.2;
const PADDING = 8; // 上下共 8 px

function getHeight(lines: number): string | null {
  if (lines <= 0) {
    return null;
  }
  
  return `${LINE_HEIGHT * lines + PADDING}px`;
}

function getStyleHeightFixed(lines: number) {
  return {
    height: getHeight(lines)
  };
}
function getStyleHeightRange([min, max]: [number, number]) {
  return {
    minHeight: getHeight(min),
    maxHeight: getHeight(max)
  };
}

export default function getExtensionHeight(lines: number | [number, number] = [4, 37]): Extension {
  return EditorView.theme({
    '&': typeof lines === 'number' ? getStyleHeightFixed(lines) : getStyleHeightRange(lines),
    '& .cm-scroller': {
      height: '100% !important',
    }
  });
}