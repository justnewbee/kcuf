import {
  IModelState
} from '../types';

export default function createInitialState(): IModelState {
  return {
    dom: null,
    codemirror: null
  };
}
