import {
  ButtonHTMLAttributes,
  ReactElement
} from 'react';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  href?: string;
  target?: string;
  label?: string | ReactElement;
}
