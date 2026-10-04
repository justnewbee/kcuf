import {
  ReactElement,
  PropsWithChildren
} from 'react';

import {
  IModelProps
} from '../types';
import Context from '../context';

export default function Provider({
  children,
  ...props
}: PropsWithChildren<IModelProps>): ReactElement {
  return <Context value={{
    props
  }}>
    {children}
  </Context>;
}
