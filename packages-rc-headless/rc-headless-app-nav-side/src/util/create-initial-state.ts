import {
  IModelProps,
  IModelState
} from '../types';

export default function createInitialState(props: IModelProps): IModelState {
  return {
    hovered: false,
    collapsed: false,
    filterValue: '',
    filterVisible: false,
    filterFocused: false
  };
}