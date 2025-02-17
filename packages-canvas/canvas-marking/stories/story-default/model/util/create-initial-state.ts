import {
  IModelState
} from '../types';

export default function createInitialState(): IModelState {
  return {
    domContainer: null,
    domMarking: null,
    everInit: false,
    optionDebugEvents: true,
    optionEditable: true,
    markingStats: null,
    markingInstance: null,
    fullscreen: false
  };
}
