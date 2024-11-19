import _isEqual from 'lodash/isEqual';
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
  IChoiceGroupRadioProps
} from '../types';

export default function ChoiceGroupRadio<T>({
  dataSource,
  label,
  value,
  defaultValue,
  onChange
}: IChoiceGroupRadioProps<T>): ReactElement | null {
  const [stateValue, setStateValue] = useState<T | undefined>(defaultValue);
  
  const handleRadioChange = useCallback((_e: ChangeEvent<HTMLInputElement>, itemValue: T) => {
    setStateValue(itemValue);
    
    onChange?.(itemValue);
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
        type: 'radio',
        checked: stateValue === v.value,
        onChange: e => handleRadioChange(e, v.value)
      }} />
      <ScChoiceGroupItemLabel>{v.label}</ScChoiceGroupItemLabel>
    </ScChoiceGroupItem>)}
  </ScChoiceGroup>;
}
