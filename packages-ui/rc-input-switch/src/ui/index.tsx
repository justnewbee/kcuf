import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  mixinBgWhite,
  mixinShadowSDown
} from '@kcuf/fork-console-base-theme';
import {
  ScBaseButton
} from '@kcuf/styled-mixin';
import {
  useProps,
  useHandleToggleSwitch
} from '@kcuf-ui/rc-input-switch-headless';

import {
  WIDTH_SWITCH,
  HEIGHT_SWITCH,
  SPACING_INNER,
  SIZE_KNOB
} from '../const';
import {
  getStyledBg,
  getStyledKnobPosition
} from '../util';

interface IScProps {
  'aria-checked': boolean;
  disabled?: boolean;
}

const ScInputSwitchWrap = styled.span`
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
`;

const ScInputSwitch = styled(ScBaseButton)<IScProps>`
  position: relative;
  width: ${WIDTH_SWITCH}px;
  height: ${HEIGHT_SWITCH}px;
  border: ${SPACING_INNER}px solid transparent;
  border-radius: ${HEIGHT_SWITCH}px;
  ${getStyledBg}
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: ${SIZE_KNOB}px;
    height: ${SIZE_KNOB}px;
    border-radius: 50%;
    transition: all linear 160ms;
    ${mixinBgWhite}
    ${mixinShadowSDown}
    ${getStyledKnobPosition}
  }
`;

const ScInputSwitchLabel = styled.label`
  margin-left: 8px;
`;

export default function Ui(): ReactElement {
  const {
    value,
    label,
    disabled,
    onChange,
    ...props
  } = useProps();
  const handleToggleSwitch = useHandleToggleSwitch();
  
  return <ScInputSwitchWrap {...props}>
    <ScInputSwitch {...{
      disabled,
      role: 'switch',
      'aria-checked': value,
      onClick: handleToggleSwitch
    }} />
    {label ? <ScInputSwitchLabel onClick={handleToggleSwitch}>{label}</ScInputSwitchLabel> : null}
  </ScInputSwitchWrap>;
}
