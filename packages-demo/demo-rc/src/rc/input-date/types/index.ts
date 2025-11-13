import {
  ForwardedRef,
  InputHTMLAttributes
} from 'react';

export type TInputDateRef = ForwardedRef<HTMLInputElement>;

/**
 * https://pikaday.dbushell.com
 */
export interface IInputDateProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
  type?: 'date' | 'time' | 'datetime';
  value?: string;
  defaultValue?: string;
  onChange?(value: string): void;
}
