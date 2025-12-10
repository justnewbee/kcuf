import {
  IModelState
} from '../types';

export default function createInitialState(): IModelState {
  return {
    domContainer: null,
    markingInstance: null
  };
}
