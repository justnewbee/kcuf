import {
  createContext
} from 'react';

import {
  ITransitionGroupContextValues
} from './types';

export default createContext<ITransitionGroupContextValues | null>(null);
