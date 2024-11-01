import {
  IModelState
} from '../types';

export default function createInitialState(): IModelState {
  return {
    activeCodes: [],
    activeModifiers: {},
    keyDetails: null
  };
}