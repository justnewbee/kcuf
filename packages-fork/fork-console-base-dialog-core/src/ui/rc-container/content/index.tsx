import {
  ReactElement,
  HTMLAttributes,
  Ref,
  forwardRef
} from 'react';
import styled from 'styled-components';

import {
  SIZE
} from '@alicloud/console-base-theme';

import {
  ModelProps,
  useProps,
  useDialogMaxContentHeight
} from '../../../model';

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const ScContent = styled.div<Partial<ModelProps>>`
  position: relative;
  flex: 1;
  overflow: auto;
  padding: ${SIZE.PADDING_X_DIALOG * 2 / 3}px ${SIZE.PADDING_X_DIALOG}px;
`;

function Content(props: IProps, ref: Ref<HTMLDivElement>): ReactElement {
  const {
    classNameOnBody,
    content
  } = useProps();
  const maxHeight = useDialogMaxContentHeight();
  
  return <ScContent {...{
    ...props,
    ref,
    style: maxHeight > 0 ? {
      maxHeight
    } : undefined,
    className: classNameOnBody
  }}>{content}</ScContent>;
}

export default forwardRef(Content);
