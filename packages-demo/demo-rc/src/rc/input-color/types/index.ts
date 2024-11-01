import {
  ForwardedRef,
  InputHTMLAttributes
} from 'react';

export type TInputColorRef = ForwardedRef<HTMLInputElement>;

export interface IInputColorProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
  value?: string;
  defaultValue?: string;
  onChange?(value: string): void;
}
