import {
  HTMLAttributes,
  ReactElement
} from 'react';

export interface IPropsInputSwitch extends Omit<HTMLAttributes<HTMLSpanElement>, 'value' | 'defaultValue' | 'aria-checked' | 'role' | 'onClick' | 'onChange'> {
  label?: string | ReactElement;
  value?: boolean;
  defaultValue?: boolean;
  disabled?: boolean;
  onChange?(value: boolean): void;
}
