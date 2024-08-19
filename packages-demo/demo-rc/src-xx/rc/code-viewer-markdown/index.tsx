import {
  ReactElement
} from 'react';

import {
  IPropsCodeViewerSimple
} from '../../types';
import CodeViewer from '../code-viewer';

export default function CodeViewerMarkdown(props: IPropsCodeViewerSimple): ReactElement {
  return <CodeViewer {...{
    ...props,
    type: 'markdown'
  }} />;
}