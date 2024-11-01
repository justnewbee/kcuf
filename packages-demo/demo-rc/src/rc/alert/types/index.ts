import {
  HTMLAttributes,
  ReactElement
} from 'react';

export interface IAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: string | ReactElement;
  type?: 'help' | 'info' | 'success' | 'warning' | 'error';
}
