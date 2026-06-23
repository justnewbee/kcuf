import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  InputColor,
  InputRange,
  ChoiceGroupRadio
} from '@kcuf/demo-rc';

import {
  toStringRgb,
  toStringHsl
} from '../../../../../src';
import {
  useControlledColor,
  useControlledColorAlpha,
  useControlledColorType
} from '../../../model';

const ScColorInput = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function ColorInput(): ReactElement {
  const [color, setColor] = useControlledColor();
  const [alpha, setAlpha] = useControlledColorAlpha();
  const [colorType, setColorType] = useControlledColorType();
  
  return <ScColorInput>
    <InputColor {...{
      value: color,
      onChange: setColor
    }} />
    <InputRange {...{
      min: 0,
      max: 100,
      value: alpha,
      onChange: setAlpha
    }} />
    <ChoiceGroupRadio {...{
      datasource: [{
        label: color,
        value: 'hex'
      }, {
        label: toStringRgb(color),
        value: 'rgb'
      }, {
        label: toStringHsl(color),
        value: 'hsl'
      }],
      value: colorType,
      onChange: setColorType
    }} />
  </ScColorInput>;
}
