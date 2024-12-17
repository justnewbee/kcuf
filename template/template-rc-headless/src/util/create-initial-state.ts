import {
  IModelProps,
  IModelState
} from '../types';

export default function createInitialState(_props: IModelProps): IModelState {
  return {
    xx: 1,
    yy: 'default'
  };
}
