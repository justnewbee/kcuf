import {
  ReactElement
} from 'react';

import {
  json5Stringify
} from '../../../util';
import CodeViewer from '../../code-viewer';
import {
  IJsonViewerProps
} from '../types';

/**
 * 展示简化的 JSON
 */
export default function JsonViewer({
  o
}: IJsonViewerProps): ReactElement {
  return <CodeViewer language="json5">{json5Stringify(o)}</CodeViewer>;
}
