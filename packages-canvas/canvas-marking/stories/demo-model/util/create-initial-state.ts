import {
  IModelState
} from '../types';

export default function createInitialState(): IModelState {
  return {
    domContainer: null,
    domMarking: null,
    everInit: false,
    optionEditable: true,
    optionDebugEvents: false,
    markingStats: null,
    markingInstance: null,
    fullscreen: false
  };
}
