import {
  HTMLAttributes,
  ReactElement
} from 'react';

export type TAlertType = 'help' | 'info' | 'success' | 'warn' | 'error';

export interface IAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: string | ReactElement;
  type?: TAlertType;
}
