import {
  HTMLAttributes
} from 'react';

import {
  EAlertType
} from '../enum';

export interface IAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  type?: EAlertType | `${EAlertType}`;
}
