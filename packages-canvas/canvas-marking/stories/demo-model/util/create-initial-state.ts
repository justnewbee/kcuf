import {
  IModelState
} from '../types';

export default function createInitialState(): IModelState {
  return {
    everInit: false,
    domContainer: null,
    domMarking: null,
    markingStats: null,
    markingInstance: null,
    logEvents: false,
    fullscreen: false
  };
}
