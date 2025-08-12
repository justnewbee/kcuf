import {
  ReactNode
} from 'react';

import {
  IModelProps
} from './props';

export interface IModelContext {
  props: IModelProps;
}

export interface IModelProviderProps extends IModelProps {
  children: ReactNode;
}
