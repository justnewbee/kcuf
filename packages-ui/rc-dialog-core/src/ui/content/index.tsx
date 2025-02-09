import {
  ReactElement,
  HTMLAttributes,
  Ref,
  forwardRef
} from 'react';
import styled from 'styled-components';

import {
  SIZE
} from '@kcuf/fork-console-base-theme';
import {
  useProps,
  useDialogMaxContentHeight
} from '@kcuf-ui/rc-dialog-headless';

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const ScContent = styled.div`
  flex: 1;
  position: relative;
  padding: ${SIZE.PADDING_X_DIALOG}px;
  overflow: auto;
`;

function Content(props: IProps, ref: Ref<HTMLDivElement>): ReactElement {
  const {
    contentClassName,
    content
  } = useProps();
  const maxHeight = useDialogMaxContentHeight();
  
  return <ScContent {...{
    ...props,
    ref,
    style: maxHeight > 0 ? {
      maxHeight
    } : undefined,
    className: contentClassName
  }}>
    {content}
  </ScContent>;
}

export default forwardRef(Content);
