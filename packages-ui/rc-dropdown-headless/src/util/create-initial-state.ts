import {
  IModelProps,
  IModelState
} from '../types';

export default function createInitialState(props: IModelProps): IModelState {
  return {
    domDropdown: null,
    domDrop: null,
    visible: props.visible ?? false
  };
}
