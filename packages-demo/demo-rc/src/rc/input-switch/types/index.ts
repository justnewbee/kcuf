import {
  ReactElement,
  ForwardedRef,
  ButtonHTMLAttributes
} from 'react';

export type TInputSwitchRef = ForwardedRef<HTMLButtonElement>;

export interface IInputSwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-checked' | 'role' | 'onClick' | 'value' | 'defaultValue' | 'onChange'> {
  value?: boolean;
  defaultValue?: boolean;
  label?: string | ReactElement;
  onChange?(value: boolean): void;
}
