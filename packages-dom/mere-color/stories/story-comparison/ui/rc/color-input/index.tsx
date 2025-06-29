import {
  ReactElement
} from 'react';

import {
  InputColor,
  ChoiceGroupRadio
} from '@kcuf/demo-rc';

import {
  toStringRgb,
  toStringHsl
} from '../../../../../src';
import {
  useStateColor,
  useStateColorType
} from '../../../model';

export default function ColorInput(): ReactElement {
  const [color, setColor] = useStateColor();
  const [colorType, setColorType] = useStateColorType();
  
  return <>
    <InputColor {...{
      value: color,
      onChange: setColor
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
    }} /></>;
}
