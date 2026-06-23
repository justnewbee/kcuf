import {
  IModelState
} from '../types';

export default function createInitialState(): IModelState {
  return {
    colorInput: '#f00',
    colorAlpha: 100,
    colorNotation: 'hex'
  };
}
