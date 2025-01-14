import {
  useCallback
} from 'react';

import useDispatchSetYy from './use-dispatch-set-yy';

export default function useHandleSetXx(): () => void {
  const dispatchSetYy = useDispatchSetYy();
  
  return useCallback((): void => dispatchSetYy(''), [dispatchSetYy]);
}
