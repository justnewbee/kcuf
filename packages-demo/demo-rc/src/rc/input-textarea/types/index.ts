import {
  ForwardedRef,
  TextareaHTMLAttributes
} from 'react';

export type TInputTextAreaRef = ForwardedRef<HTMLTextAreaElement>;

export interface IInputTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'children' | 'value' | 'defaultValue' | 'onChange'> {
  value?: string;
  defaultValue?: string;
  onChange?(value: string): void;
}
