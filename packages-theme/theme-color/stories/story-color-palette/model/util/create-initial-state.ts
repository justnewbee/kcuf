import {
  IModelState
} from '../types';

export default function createInitialState(): IModelState {
  return {
    dark: false,
    hueOffset: 0,
    saturation: 100,
    selectedHueLightness: null
  };
}
