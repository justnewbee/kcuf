import {
  IModelProps,
  IModelState
} from '../types';

import singletonPush from './singleton-push';
import singletonIsVisible from './singleton-is-visible';

export default function createInitialState(props: IModelProps): IModelState {
  const n = singletonPush(props);
  
  return {
    n,
    visible: singletonIsVisible(n)
  };
}