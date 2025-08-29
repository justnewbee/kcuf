import {
  IModelState
} from '../types';

export default function createInitialState(): IModelState {
  return {
    hovered: false,
    collapsed: false,
    filterValue: '',
    filterVisible: false,
    filterFocused: false
  };
}
