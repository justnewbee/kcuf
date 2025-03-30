import {
  ForwardedRef,
  TextareaHTMLAttributes
} from 'react';

export type TInputTextareaRef = ForwardedRef<HTMLTextAreaElement>;

export interface IInputTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'children' | 'value' | 'defaultValue' | 'onChange'> {
  value?: string;
  defaultValue?: string;
  onChange?(value: string): void;
}
