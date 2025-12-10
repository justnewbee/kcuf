import {
  ReactElement
} from 'react';

import {
  IModelProviderProps
} from '../types';
import Context from '../context';

export default function Provider({
  children,
  ...props
}: IModelProviderProps): ReactElement {
  return <Context value={{
    props
  }}>
    {children}
  </Context>;
}
