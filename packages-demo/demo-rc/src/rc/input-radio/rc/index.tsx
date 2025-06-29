import {
  ReactElement
} from 'react';

import useControllable from '@kcuf-hook/use-controllable';

import FormControlWithLabel from '../../_form-control-with-label';
import {
  IInputRadioProps
} from '../types';

export default function InputRadio({
  label,
  checked,
  defaultChecked,
  onChange
}: IInputRadioProps): ReactElement {
  const [controllableChecked, setControllableChecked] = useControllable<boolean>(false, checked, defaultChecked, onChange);
  
  return <FormControlWithLabel label={label}>
    <input {...{
      type: 'radio',
      checked: controllableChecked,
      onChange: e => setControllableChecked(e.target.checked)
    }} />
  </FormControlWithLabel>;
}
