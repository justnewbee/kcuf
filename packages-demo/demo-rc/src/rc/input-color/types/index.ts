import {
  Ref,
  InputHTMLAttributes
} from 'react';

export interface IInputColorProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
  ref?: Ref<HTMLInputElement>;
  value?: string;
  defaultValue?: string;
  withAlpha?: boolean;
  onChange?(value: string): void;
}
