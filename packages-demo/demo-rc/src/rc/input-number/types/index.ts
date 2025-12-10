import {
  Ref,
  InputHTMLAttributes
} from 'react';

export interface IInputNumberProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
  ref?: Ref<HTMLInputElement>;
  value?: number;
  defaultValue?: number;
  onChange?(value: number): void;
}
