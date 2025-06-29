import {
  ReactElement
} from 'react';

import useControllable from '@kcuf-hook/use-controllable';

import FormControlWithLabel from '../../_form-control-with-label';
import {
  IInputCheckboxProps
} from '../types';

export default function InputCheckbox({
  label,
  checked,
  defaultChecked,
  onChange
}: IInputCheckboxProps): ReactElement {
  const [controllableChecked, setControllableChecked] = useControllable<boolean>(false, checked, defaultChecked, onChange);
  
  return <FormControlWithLabel label={label}>
    <input {...{
      type: 'checkbox',
      checked: controllableChecked,
      onChange: e => setControllableChecked(e.target.checked)
    }} /></FormControlWithLabel>;
}
