import {
  Ref,
  InputHTMLAttributes
} from 'react';

export interface IInputRangeProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
  ref?: Ref<HTMLInputElement>;
  value?: number;
  defaultValue?: number;
  onChange?(value: number): void;
}
