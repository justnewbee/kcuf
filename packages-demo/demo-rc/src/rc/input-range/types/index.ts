import {
  ForwardedRef,
  InputHTMLAttributes
} from 'react';

export type TInputRangeRef = ForwardedRef<HTMLInputElement>;

export interface IInputRangeProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
  value?: number;
  defaultValue?: number;
  onChange?(value: number): void;
}
