import {
  IModelState
} from '../types';

export default function createInitialState(): IModelState {
  return {
    domContainer: null,
    
    everInit: false,
    markingInstanceStats: null,
    markingInstance: null,
    logEvents: false,
    fullscreen: false
  };
}
