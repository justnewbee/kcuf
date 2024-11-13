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
    ...restProps
  } = props;
  
  return <Codemirror {...{
    ...restProps,
    value: props.content || props.children,
    readOnly: true
  }} />;
}
