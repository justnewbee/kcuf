import {
  ButtonHTMLAttributes
} from 'react';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  target?: string;
}