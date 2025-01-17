import {
  ReactElement,
  useCallback
} from 'react';
import styled from 'styled-components';

import {
  mixinBgWhite,
  mixinShadowSDown
} from '@kcuf/fork-console-base-theme';
import {
  ScBaseButton
} from '@kcuf/styled-mixin';
import useControllable from '@kcuf-hook/use-controllable';

import {
  IPropsInputSwitch
} from '../../types';
import {
  WIDTH_SWITCH,
  HEIGHT_SWITCH,
  SPACING_INNER,
  SIZE_KNOB
} from '../../const';
import {
  getStyledBg,
  getStyledKnobPosition
} from '../../util';

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

export default function InputSwitch({
  label,
  value,
  defaultValue,
  disabled,
  onChange,
  ...props
}: IPropsInputSwitch): ReactElement {
  const [controllableValue, setControllableValue] = useControllable(false, value, defaultValue, onChange);
  const handleClick = useCallback(() => setControllableValue(!controllableValue), [controllableValue, setControllableValue]);
  
  return <ScInputSwitchWrap {...props}>
    <ScInputSwitch {...{
      disabled,
      role: 'switch',
      'aria-checked': controllableValue,
      onClick: handleClick
    }} />
    {label ? <ScInputSwitchLabel onClick={disabled ? undefined : handleClick}>{label}</ScInputSwitchLabel> : null}
  </ScInputSwitchWrap>;
}
