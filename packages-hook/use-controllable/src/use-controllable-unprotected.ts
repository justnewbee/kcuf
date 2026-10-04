import {
  useState
} from 'react';

import {
  TOnChange,
  THookReturnUnprotected
} from './types';

/**
 * 不受最终默认值保护的受控（封装泛型组件时，无法确认最终默认值，可以用此 hook）
 */
export default function useControllableUnprotected<T = string, A extends unknown[] = []>(value?: T, defaultValue?: T, onChange?: TOnChange<T, A>): THookReturnUnprotected<T, A> {
  const [stateValue, setStateValue] = useState<T | undefined>(value ?? defaultValue);
  const finalValue = value !== undefined ? value : stateValue;
  
  const handleChange = (valueNew: T, ...args: A): void => {
    setStateValue(valueNew);
    onChange?.(valueNew, ...args);
  };
  
  return [finalValue, handleChange];
}
