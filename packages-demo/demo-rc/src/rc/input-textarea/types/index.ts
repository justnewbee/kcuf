import {
  Ref,
  TextareaHTMLAttributes
} from 'react';

export interface IInputTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'children' | 'value' | 'defaultValue' | 'onChange'> {
  ref?: Ref<HTMLTextAreaElement>;
  value?: string;
  defaultValue?: string;
  onChange?(value: string): void;
}
