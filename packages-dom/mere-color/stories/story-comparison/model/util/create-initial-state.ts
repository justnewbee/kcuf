import {
  IModelState
} from '../types';

export default function createInitialState(): IModelState {
  return {
    color: '#f00',
    colorType: 'hex'
  };
}
