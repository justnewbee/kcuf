import {
  useCallback
} from 'react';

import useDispatchSetXx from './use-dispatch-set-xx';

export default function useDispatchXx(): () => void {
  const dispatchSetXx = useDispatchSetXx();
  
  return useCallback((): void => dispatchSetXx(1234), [dispatchSetXx]);
}
