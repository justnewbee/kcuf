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
  useProps,
  useButtonDomProps,
  useButtonLabel
} from '@kcuf-ui/rc-button-headless';

import {
  IScButtonProps
} from '../types';
import {
  isBorderless,
  getStyleTextAlign,
  cssButtonPreset,
  cssButtonSize
  // cssButtonShadow
} from '../util';

import ButtonIconStart from './button-icon-start';
import ButtonIconEnd from './button-icon-end';

const ScInnerLabel = styled.span`
  ${mixinTypoEllipsis}
`;

function getStyleBorderRadius(props: IScButtonProps): string {
  if (isBorderless(props)) {
    return '0';
  }
  
  return '2px';
}

const ScButton = styled(ScBaseButton)<Partial<ButtonProps>>`
  gap: 0.5rem;
  border: ${props => isBorderless(props) ? 'none' : '1px solid transparent'};
  border-radius: ${getStyleBorderRadius};
  text-align: ${getStyleTextAlign};
  vertical-align: middle;
  ${mixinTypoEllipsis}
  ${cssButtonPreset}
  ${cssButtonSize}
  
  &[data-loading] {
    opacity: 0.65;
    cursor: default;
  }
  
  &[disabled],
  &[data-disabled] {
    opacity: 0.35;
  }
  
  &[data-fluid] {
    display: flex;
    width: 100%;
  }
`;

function Ui(_props: unknown, ref: Ref<HTMLDivElement>): ReactElement {
  const {
    component,
    preset,
    size,
    textAlign,
    active
  } = useProps();
  const buttonDomProps = useButtonDomProps();
  const label = useButtonLabel();
  
  return <ScButton ref={ref} as={component} {...{
    $preset: preset,
    $size: size,
    $textAlign: textAlign,
    $active: active,
    ...buttonDomProps
  }}>
    <ButtonIconStart />
    {label ? <ScInnerLabel>{label}</ScInnerLabel> : null}
    <ButtonIconEnd /></ScButton>;
}

export default forwardRef(Ui);
