import {
  IModelState
} from '../types';

export default function createInitialState(): IModelState {
  return {
    domContainer: null,
    domMarking: null,
    everInit: false,
    optionDebugEvents: localStorage.debug === 'canvas-marking',
    optionNoHover: false,
    optionNoClick: false,
    optionNoSelect: false,
    optionNoDelete: false,
    optionNoEditRemovePoint: false,
    optionNoEdit: false,
    optionNoEditDragPoint: false,
    optionNoEditDragInsertion: false,
    optionNoEditDragWhole: false,
    optionNoCrossingDetection: false,
    markingStats: null,
    markingInstance: null,
    fullscreen: false
  };
}
