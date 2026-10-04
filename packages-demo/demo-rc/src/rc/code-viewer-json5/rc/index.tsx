import {
  ReactElement
} from 'react';
import {
  parse
} from 'json5';

import {
  json5Stringify
} from '../../../util';
import CodeViewer from '../../code-viewer';
import {
  ICodeViewerJson5Props
} from '../types';

/**
 * 展示简化的 JSON
 */
export default function CodeViewerJson5<T = unknown>({
  o,
  onChange,
  ...props
}: ICodeViewerJson5Props<T>): ReactElement {
  return <CodeViewer {...{
    ...props,
    language: 'json5',
    onChange: value => onChange?.(parse<T>(value))
  }}>{json5Stringify(o)}</CodeViewer>;
}
