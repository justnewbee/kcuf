import {
  useEffect
} from 'react';

import clickHijack from '@kcuf/click-hijacker';

import {
  IHijackResult,
  IReactRouterClickHijackerProps
} from './types';
import {
  condition
} from './util';
import {
  useHandleHijackCallback
} from './hook';

export default function ReactRouterClickHijacker({
  ignore
}: IReactRouterClickHijackerProps): null {
  const callback = useHandleHijackCallback();
  
  useEffect(() => clickHijack<IHijackResult>({
    ignore,
    condition,
    callback
  }), [ignore, callback]);
  
  return null;
}
