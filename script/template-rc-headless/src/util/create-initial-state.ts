import {
  IModelProps,
  IModelState
} from '../types';

export default function createInitialState(props: IModelProps): IModelState {
  return {
    xx: 1,
    yy: 'default'
  };
}