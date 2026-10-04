import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  SIZE,
  mixinInputBg,
  mixinInputBgDisabled,
  mixinInputBorder,
  mixinInputBorderDisabled,
  mixinInputBgFocus,
  mixinInputBorderFocus,
  mixinShadowM
} from '@kcuf/fork-console-base-theme';
import {
  useProps
} from '@kcuf-ui/input-text-headless';

import {
  IScInputProps
} from '../types';

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
  ${mixinInputBg}
  ${mixinInputBorder}
  
  &:focus-within {
    ${mixinInputBgFocus}
    ${mixinInputBorderFocus}
    ${mixinShadowM}
  }
  
  &:hover:not([data-disabled]) {
    ${mixinShadowM}
  }
  
  &[data-disabled] {
    ${mixinInputBgDisabled}
    ${mixinInputBorderDisabled}
  }
`;

export default function Ui(): ReactElement {
  const {
    fluid,
    round,
    disabled,
    className,
    style
  } = useProps();
  
  return <ScUi {...{
    className,
    style,
    disabled,
    $fluid: fluid,
    $round: round,
    'data-disabled': disabled ? '' : undefined
  }}>
    <AddonBefore />
    <AddonPrefix />
    <TheInput />
    <Count />
    <AddonSuffix />
    <AddonAfter />
  </ScUi>;
}
