import {
  ReactElement,
  Ref,
  forwardRef
} from 'react';
import styled from 'styled-components';

import {
  ScBaseButton,
  mixinTypoEllipsis
} from '@kcuf/styled-mixin';
import {
  ButtonProps,
  usePropsCustom,
  usePropsDom
} from '@kcuf/rc-headless-button';

import {
  IScButtonProps
} from './types';
import {
  isBlock,
  isBorderless,
  getStyleTextAlign,
  cssButtonPreset,
  cssButtonSize,
  cssButtonShadow
} from './util';
import {
  ButtonIconLeft,
  ButtonIconRight
} from './rc-container';

// 当有 iconLeft iconRight loading 时对内容的包裹
const ScInner = styled.span`
  display: flex;
  align-items: center;
`;

const ScInnerLabel = styled.span`
  flex: 1;
  ${mixinTypoEllipsis}
`;

function getStyleBorderRadius(props: IScButtonProps): string {
  if (isBorderless(props) || !props.$borderRadius) {
    return '0';
  }
  
  return props.$borderRadius === 'full' ? '100px' : '2px';
}

function getStyleCursor(props: IScButtonProps): string {
  if (props.disabled) {
    return 'not-allowed';
  }
  
  if (props.$loading) {
    return 'default';
  }
  
  return props.$cursor || 'pointer';
}

const ScButton = styled(ScBaseButton)<Partial<ButtonProps>>`
  display: ${props => isBlock(props) ? 'block' : 'inline-block'};
  overflow: hidden;
  width: ${props => isBlock(props) ? '100%' : 'auto'};
  max-width: 100%;
  text-align: ${getStyleTextAlign};
  vertical-align: middle;
  border: ${props => isBorderless(props) ? 'none' : '1px solid transparent'};
  border-radius: ${getStyleBorderRadius};
  cursor: ${getStyleCursor};
  ${mixinTypoEllipsis}
  ${cssButtonPreset}
  ${cssButtonSize}
  ${cssButtonShadow}
`;

function Ui(_props: unknown, ref: Ref<HTMLDivElement>): ReactElement {
  const {
    label,
    iconLeft,
    iconRight,
    loading,
    component,
    preset,
    size,
    noShadow,
    textAlign,
    cursor,
    borderRadius,
    block,
    active
  } = usePropsCustom();
  const {
    children,
    ...propsDom
  } = usePropsDom();
  const jsxLabel = label || children; // label prior to children
  
  return <ScButton
    ref={ref}
    as={component}
    {...{
      $preset: preset,
      $size: size,
      $loading: loading, // 否则报错
      $noShadow: noShadow,
      $textAlign: textAlign,
      $cursor: cursor,
      $borderRadius: borderRadius,
      $block: block,
      $active: active,
      ...propsDom
    }}>
    {iconLeft || iconRight || loading ? <ScInner>
      <ButtonIconLeft />
      {jsxLabel ? <ScInnerLabel>{jsxLabel}</ScInnerLabel> : null}
      <ButtonIconRight />
    </ScInner> : jsxLabel}
  </ScButton>;
}

export default forwardRef(Ui);
