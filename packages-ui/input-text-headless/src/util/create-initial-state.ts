import {
  IModelState
} from '../types';

export default function createInitialState(value: string): IModelState {
  return {
    value,
    composing: false
  };
}
