import {
  ForwardedRef,
  InputHTMLAttributes
} from 'react';

export type TInputTextRef = ForwardedRef<HTMLInputElement>;

export interface IInputTextProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
  block?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?(value: string): void;
}
