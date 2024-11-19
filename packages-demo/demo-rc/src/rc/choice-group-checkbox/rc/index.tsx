import _isEqual from 'lodash/isEqual';
import _without from 'lodash/without';
import {
  ReactElement,
  ChangeEvent,
  useState,
  useCallback,
  useEffect
} from 'react';

import {
  ScChoiceGroup,
  ScChoiceGroupLabel,
  ScChoiceGroupItem,
  ScChoiceGroupItemLabel
} from '../../choice-group-common';
import {
  IChoiceGroupCheckboxProps
} from '../types';

export default function ChoiceGroupCheckbox<T>({
  dataSource,
  label,
  value,
  defaultValue = [],
  onChange
}: IChoiceGroupCheckboxProps<T>): ReactElement | null {
  const [stateValue, setStateValue] = useState<T[]>(defaultValue);
  
  const handleCheckboxChange = useCallback((e: ChangeEvent<HTMLInputElement>, itemValue: T) => {
    setStateValue(currentValue => {
      const newValue = e.target.checked ? [...currentValue, itemValue] : _without(currentValue, itemValue);
      
      onChange?.(newValue);
      
      return newValue;
    });
  }, [onChange, setStateValue]);
  
  useEffect(() => {
    if (value && !_isEqual(value, stateValue)) {
      setStateValue(value);
    }
  }, [value, stateValue, setStateValue]);
  
  return <ScChoiceGroup>
    {label ? <ScChoiceGroupLabel>{label}</ScChoiceGroupLabel> : null}
    {dataSource.map((v, i) => <ScChoiceGroupItem key={`${v.value}-${i}`}>
      <input {...{
        type: 'checkbox',
        checked: stateValue.includes(v.value),
        onChange: e => handleCheckboxChange(e, v.value)
      }} />
      <ScChoiceGroupItemLabel>{v.label}</ScChoiceGroupItemLabel>
    </ScChoiceGroupItem>)}
  </ScChoiceGroup>;
}
