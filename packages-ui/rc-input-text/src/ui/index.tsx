import {
  ForwardedRef,
  ReactElement,
  forwardRef,
  useImperativeHandle
} from 'react';
import styled from 'styled-components';

import {
  SIZE
} from '@kcuf/fork-console-base-theme';
import {
  useProps,
  useHovered,
  useFocused,
  useHandleMouseEnter,
  useHandleMouseLeave, useImperativeRef,
  InputTextImperativeRef
} from '@kcuf-ui/rc-input-text-headless';

import {
  IScInputProps
} from '../types';
import {
  getStyledBorder,
  getStyledShadow
} from '../util';

import AddonBefore from './addon-before';
import AddonPrefix from './addon-prefix';
import TheInput from './the-input';
import Count from './count';
import AddonSuffix from './addon-suffix';
import AddonAfter from './addon-after';

const ScUi = styled.div<IScInputProps>`
  display: ${props => props.$fluid ? 'flex' : 'inline-flex'};
  align-items: center;
  position: relative;
  height: ${SIZE.HEIGHT_FORM_CONTROL_M}px;
  border: 1px solid transparent;
  border-radius: ${props => props.$round ? `${SIZE.HEIGHT_FORM_CONTROL_M}px` : 'none'};
  box-sizing: border-box;
  font-size: ${SIZE.FONT_SIZE_BODY}px;
  transition: all 0.3s ease-out;
  ${getStyledBorder}
  ${getStyledShadow}
`;

function Ui(_props: unknown, ref: ForwardedRef<InputTextImperativeRef>): ReactElement {
  const {
    fluid,
    round,
    disabled,
    className,
    style
  } = useProps();
  const hovered = useHovered();
  const focused = useFocused();
  const handleMouseEnter = useHandleMouseEnter();
  const handleMouseLeave = useHandleMouseLeave();
  
  const imperativeRef = useImperativeRef();
  
  useImperativeHandle(ref, () => imperativeRef, [imperativeRef]);
  
  return <ScUi {...{
    className,
    style,
    disabled,
    $fluid: fluid,
    $round: round,
    // $weakFocusStyle: weakFocusStyle,
    // $borderless: borderless,
    $hovered: hovered,
    $focused: focused,
    'data-hovered': hovered ? '' : undefined,
    'data-focused': focused ? '' : undefined,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }}>
    <AddonBefore />
    <AddonPrefix />
    <TheInput />
    <Count />
    <AddonSuffix />
    <AddonAfter />
  </ScUi>;
}

export default forwardRef(Ui);
