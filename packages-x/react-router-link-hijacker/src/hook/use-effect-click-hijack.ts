import {
  useEffect
} from 'react';

import clickHijack from '@kcuf/click-hijacker';

import {
  IHijackResult
} from '../types';
import {
  condition
} from '../util';

import useHandleHijackCallback from './use-handle-hijack-callback';

export default function useEffectClickHijack(): void {
  const callback = useHandleHijackCallback();
  
  useEffect(() => {
    return clickHijack<IHijackResult>({
      condition,
      callback
    });
  }, [callback]);
}
