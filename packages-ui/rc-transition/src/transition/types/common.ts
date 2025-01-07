import {
  ReactElement
} from 'react';

import {
  ETransitionStatus
} from '../enum';

export type TRenderChildren = (status: `${ETransitionStatus}`) => ReactElement;
