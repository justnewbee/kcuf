import {
  IModelState
} from '../types';

export default function createInitialState(): IModelState {
  return {
    domContainer: null,
    domMarking: null,
    markingStageStats: null,
    markingStage: null,
    fullscreen: false,
    floatingVisible: false
  };
}