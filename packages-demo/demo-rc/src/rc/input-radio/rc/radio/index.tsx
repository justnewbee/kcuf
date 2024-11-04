import {
  ChangeEvent,
  ReactElement,
  useCallback
} from 'react';

import useControllable from '@kcuf/react-hook-controllable';

import {
  IInputRadioProps
} from '../../types';

export default function Radio<T = void>(props: IInputRadioProps<T>): ReactElement {
  const {
    value,
    checked,
    defaultChecked,
    onChange,
    ...restProps
  } = props;
  const [controllableChecked, controllableOnChange] = useControllable(false, checked, defaultChecked);
  
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const targetChecked = e.target.checked;
    
    controllableOnChange(targetChecked);
    onChange?.(targetChecked, value);
  }, [value, onChange, controllableOnChange]);
  
  return <input {...{
    ...restProps,
    type: 'radio',
    checked: controllableChecked,
    onChange: handleChange
  }} />;
}