import {
  Ref,
  InputHTMLAttributes
} from 'react';

/**
 * https://pikaday.dbushell.com
 */
export interface IInputDateProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
  ref?: Ref<HTMLInputElement>;
  type?: 'date' | 'time' | 'datetime';
  value?: string;
  defaultValue?: string;
  onChange?(value: string): void;
}
