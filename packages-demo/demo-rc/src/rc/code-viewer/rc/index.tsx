import {
  ReactElement
} from 'react';

import Codemirror from '../../codemirror';
import {
  ICodeViewerProps
} from '../types';

export default function CodeViewer(props: ICodeViewerProps): ReactElement {
  const {
    content,
    children,
    readOnly = true,
    ...restProps
  } = props;
  
  return <Codemirror {...{
    readOnly,
    ...restProps,
    value: props.content ?? props.children
  }} />;
}
