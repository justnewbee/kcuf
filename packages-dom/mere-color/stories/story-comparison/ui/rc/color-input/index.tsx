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
  useControlledColorInput,
  useControlledColorAlpha,
  useControlledColorNotation,
  useColorInputWithAlpha
} from '../../../model';

const ScColorInput = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function ColorInput(): ReactElement {
  const [colorInput, setColorInput] = useControlledColorInput();
  const [alpha, setAlpha] = useControlledColorAlpha();
  const [colorNotation, setColorNotation] = useControlledColorNotation();
  const colorInputWithAlpha = useColorInputWithAlpha();
  
  return <ScColorInput>
    <InputColor {...{
      value: colorInput,
      onChange: setColorInput
    }} />
    <InputRange {...{
      min: 0,
      max: 100,
      value: alpha,
      onChange: setAlpha
    }} />
    <ChoiceGroupRadio {...{
      datasource: [{
        label: colorInputWithAlpha,
        value: 'hex'
      }, {
        label: toStringRgb(colorInputWithAlpha),
        value: 'rgb'
      }, {
        label: toStringHsl(colorInputWithAlpha),
        value: 'hsl'
      }],
      value: colorNotation,
      onChange: setColorNotation
    }} />
  </ScColorInput>;
}
