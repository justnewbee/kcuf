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
} from '@kcuf-ui/rc-button-headless';

import {
  IScButtonProps
} from '../types';
import {
  isBorderless,
  getStyleTextAlign,
  cssButtonPreset,
  cssButtonSize,
  cssButtonShadow
} from '../util';

import ButtonIconStart from './button-icon-start';
import ButtonIconEnd from './button-icon-end';

const ScInnerLabel = styled.span`
  ${mixinTypoEllipsis}
`;

function getStyleBorderRadius(props: IScButtonProps): string {
  if (isBorderless(props) || !props.$borderRadius) {
    return '0';
  }
  
  return props.$borderRadius === 'full' ? '100px' : '2px';
}

const ScButton = styled(ScBaseButton)<Partial<ButtonProps>>`
  overflow: hidden;
  border: ${props => isBorderless(props) ? 'none' : '1px solid transparent'};
  border-radius: ${getStyleBorderRadius};
  text-align: ${getStyleTextAlign};
  vertical-align: middle;
  ${mixinTypoEllipsis}
  ${cssButtonPreset}
  ${cssButtonSize}
  ${cssButtonShadow}
  
  &[data-button-loading] {
    cursor: default;
  }
  
  &[data-button-fluid] {
    display: flex;
    width: 100%;
  }
`;

function Ui(_props: unknown, ref: Ref<HTMLDivElement>): ReactElement {
  const {
    label,
    iconStart,
    iconEnd,
    loading,
    component,
    preset,
    size,
    noShadow,
    textAlign,
    borderRadius,
    fluid,
    active
  } = usePropsCustom();
  const {
    children,
    ...propsDom
  } = usePropsDom();
  const jsxLabel = label || children; // label prior to children
  
  return <ScButton ref={ref} as={component} {...{
    $preset: preset,
    $size: size,
    $noShadow: noShadow,
    $textAlign: textAlign,
    $borderRadius: borderRadius,
    $active: active,
    ...propsDom,
    'data-button-loading': loading ? '' : undefined,
    'data-button-fluid': fluid ? '' : undefined
  }}>
    {iconStart || iconEnd || loading ? <>
      <ButtonIconStart />
      {jsxLabel ? <ScInnerLabel>{jsxLabel}</ScInnerLabel> : null}
      <ButtonIconEnd />
    </> : jsxLabel}
  </ScButton>;
}

export default forwardRef(Ui);
