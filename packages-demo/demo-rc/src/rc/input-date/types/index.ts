import {
  ForwardedRef,
  InputHTMLAttributes
} from 'react';

export type TInputDateRef = ForwardedRef<HTMLInputElement>;

export interface IInputDateProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
  value?: number;
  defaultValue?: number;
  onChange?(value: number): void;
}
