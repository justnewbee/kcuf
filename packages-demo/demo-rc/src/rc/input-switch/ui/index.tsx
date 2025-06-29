import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  useProps,
  useHandleToggleSwitch
} from '@kcuf-ui/rc-input-switch-headless';

import {
  HEIGHT_INPUT_SWITCH,
  WIDTH_INPUT_SWITCH,
  SPACING_INPUT_SWITCH_INNER,
  SIZE_INPUT_SWITCH_KNOB
} from '../../../const';
import FormControlWithLabel from '../../_form-control-with-label';
import {
  getStyledSwitchBg,
  getStyledSwitchKnobPosition
} from '../util';

interface IScProps {
  'aria-checked': boolean;
  disabled?: boolean;
}

const ScSwitchButton = styled.button<IScProps>`
  position: relative;
  width: ${WIDTH_INPUT_SWITCH}px;
  height: ${HEIGHT_INPUT_SWITCH}px;
  border: ${SPACING_INPUT_SWITCH_INNER}px solid transparent;
  border-radius: ${HEIGHT_INPUT_SWITCH}px;
  cursor: pointer;
  ${getStyledSwitchBg}
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: ${SIZE_INPUT_SWITCH_KNOB}px;
    height: ${SIZE_INPUT_SWITCH_KNOB}px;
    background-color: hsl(0 0% 100%);
    border-radius: 50%;
    box-shadow: 0 1px 2px 0 hsl(0 0% 0% / 16%);
    transition: all linear 160ms;
    ${getStyledSwitchKnobPosition}
  }
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
  
  return <FormControlWithLabel label={label}>
    <ScSwitchButton {...{
      ...props,
      disabled,
      role: 'switch',
      'aria-checked': value,
      onClick: handleToggleSwitch
    }} /></FormControlWithLabel>;
}
