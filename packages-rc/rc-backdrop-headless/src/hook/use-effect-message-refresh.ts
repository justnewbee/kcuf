import {
  useEffect
} from 'react';

import {
  EMessageType
} from '../enum';
import {
  messageListen
} from '../util';

import useModelState from './_use-model-state';
import useDispatchRefreshVisible from './use-dispatch-refresh-visible';

export default function useEffectMessageRefresh(): void {
  const {
    n
  } = useModelState();
  const dispatchRefreshVisible = useDispatchRefreshVisible();
  
  useEffect(() => messageListen<number>(EMessageType.REFRESH, payload => {
    if (payload !== n) {
      dispatchRefreshVisible();
    }
  }), [n, dispatchRefreshVisible]);
}
