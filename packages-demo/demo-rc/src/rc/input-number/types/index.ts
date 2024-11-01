import {
  ForwardedRef,
  InputHTMLAttributes
} from 'react';

export type TInputNumberRef = ForwardedRef<HTMLInputElement>;

export interface IInputNumberProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
  value?: number;
  defaultValue?: number;
  onChange?(value: number): void;
}
