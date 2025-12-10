import {
  Ref,
  InputHTMLAttributes
} from 'react';

export interface IInputTextProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
  ref?: Ref<HTMLInputElement>;
  block?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?(value: string): void;
}
