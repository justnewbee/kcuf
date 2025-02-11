import {
  ReactElement
} from 'react';

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
export default function CodeViewerJson5({
  o
}: ICodeViewerJson5Props): ReactElement {
  return <CodeViewer language="json5">{json5Stringify(o)}</CodeViewer>;
}
