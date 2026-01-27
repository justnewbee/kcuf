import {
  useEffect
} from 'react';

import messenger from '@kcuf/messenger';

import {
  EMessageType
} from '../enum';
import {
  singletonPush,
  singletonPull
} from '../util';

import useModelContext from './_use-model-context';
import useDispatchRefreshVisible from './use-dispatch-refresh-visible';

export default function useEffectSingleton(): void {
  const {
    props: {
      zIndex
    }
  } = useModelContext();
  const dispatchRefreshVisible = useDispatchRefreshVisible();
  
  useEffect(() => {
    const n = singletonPush(zIndex);
    const messengerOff = messenger.on<number>(EMessageType.REFRESH, payload => {
      if (payload !== n) {
        dispatchRefreshVisible(n);
      }
    });
    
    dispatchRefreshVisible(n);
    
    return () => {
      singletonPull(n);
      messengerOff();
    };
  }, [zIndex, dispatchRefreshVisible]);
}
