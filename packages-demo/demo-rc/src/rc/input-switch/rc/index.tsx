import {
  ReactElement,
  forwardRef,
  useCallback
} from 'react';
import styled from 'styled-components';

import useControllable from '@kcuf/react-hook-controllable';

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
import {
  TInputSwitchRef,
  IInputSwitchProps
} from '../types';

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
  
  return <FormControlWithLabel label={label}>
    <ScSwitchButton {...{
      ref,
      ...props,
      disabled,
      role: 'switch',
      'aria-checked': controllableValue,
      onClick: handleClick
    }} />
  </FormControlWithLabel>;
}

export default forwardRef(InputSwitch);
