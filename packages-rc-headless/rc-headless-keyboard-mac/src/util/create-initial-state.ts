import {
  IModelState
} from '../types';

export default function createInitialState(): IModelState {
  return {
    codes: [],
    modifierState: {},
    keyDetails: null
  };
}