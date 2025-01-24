import {
  IModelState
} from '../types';

export default function createInitialState(): IModelState {
  return {
    dark: false,
    text: false,
    grayscale: false
  };
}
