import {
  ReactElement
} from 'react';

import {
  useControllableSoftTrim
} from '@kcuf-hook/use-controllable';

import {
  ScInput
} from '../../_sc-base';
import {
  IInputTextProps
} from '../types';

export default function InputText({
  block,
  value,
  defaultValue,
  onChange,
  ...props
}: IInputTextProps): ReactElement {
  const [controllableValue, controllableOnChange] = useControllableSoftTrim(true, value, defaultValue, onChange);
  
  return <ScInput {...{
    $block: block,
    ...props,
    value: controllableValue,
    type: 'text',
    onChange: e => controllableOnChange(e.target.value)
  }} />;
}
