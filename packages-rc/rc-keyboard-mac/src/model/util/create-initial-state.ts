import {
  IModelState
} from '../types';

export default function createInitialState(): IModelState {
  return {
    codes: [],
    capsLock: false,
    keyDetails: null
  };
}