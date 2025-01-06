import {
  ReactElement
} from 'react';

import {
  ETransactionStatus
} from '../enum';

export type TRenderChildren = (status: `${ETransactionStatus}`) => ReactElement;

export interface ITransitionDurations {
  appear?: number;
  enter?: number;
  exit?: number;
}
