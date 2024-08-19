import {
  ReactElement,
  forwardRef,
  useCallback
} from 'react';
import styled from 'styled-components';

import {
  useControllable
} from '@kcuf/react-hook-controllable';

import {
  HEIGHT_INPUT_SWITCH,
  WIDTH_INPUT_SWITCH,
  SPACING_INPUT_SWITCH_INNER,
  SIZE_INPUT_SWITCH_KNOB
} from '../../../const';
import {
  getStyledSwitchBg,
  getStyledSwitchKnobPosition
} from '../util';
import {
  TInputSwitchRef,
  IInputSwitchProps
} from '../types';

interface IScProps {
  'aria-checked': boolean;
  disabled?: boolean;
}

const ScSwitch = styled.span`
  display: inline-flex;
  align-items: center;
  margin: 0 12px;
  vertical-align: middle;
  
  &:first-child {
    margin-left: 0;
  }
  
  &:last-child {
    margin-right: 0;
  }
`;

const ScSwitchButton = styled.button<IScProps>`
  position: relative;
  border: ${SPACING_INPUT_SWITCH_INNER}px solid transparent;
  border-radius: ${HEIGHT_INPUT_SWITCH}px;
  width: ${WIDTH_INPUT_SWITCH}px;
  height: ${HEIGHT_INPUT_SWITCH}px;
  line-height: 2;
  cursor: pointer;
  
  ${getStyledSwitchBg}
  &::after {
    content: '';
    position: absolute;
    top: 0;
    border-radius: 50%;
    box-shadow: 0 1px 2px 0 hsl(0 0% 0% / 16%);
    background-color: hsl(0 0% 100%);
    width: ${SIZE_INPUT_SWITCH_KNOB}px;
    height: ${SIZE_INPUT_SWITCH_KNOB}px;
    transition: all linear 160ms;
    ${getStyledSwitchKnobPosition}
  }
`;

const ScSwitchLabel = styled.label`
  margin-left: 8px;
`;

function InputSwitch({
  value,
  defaultValue = false,
  label,
  disabled,
  onChange,
  ...props
}: IInputSwitchProps, ref: TInputSwitchRef): ReactElement {
  const [controllableValue, controllableOnChange] = useControllable<boolean>(false, value, defaultValue, onChange);
  const handleClick = useCallback(() => controllableOnChange(!controllableValue), [controllableValue, controllableOnChange]);
  
  return <ScSwitch>
    <ScSwitchButton {...{
      ref,
      ...props,
      disabled,
      role: 'switch',
      'aria-checked': controllableValue,
      onClick: handleClick
    }} />
    {label ? <ScSwitchLabel onClick={disabled ? undefined : handleClick}>{label}</ScSwitchLabel> : null}
  </ScSwitch>;
}

export default forwardRef(InputSwitch);
