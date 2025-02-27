import {
  MarkingStats,
  CanvasMarkingClassType
} from '../../../../src';

export interface IModelState {
  domContainer: HTMLDivElement | null;
  domMarking: HTMLDivElement | null;
  everInit: boolean;
  optionDebugEvents: boolean;
  optionNoHover: boolean;
  optionNoClick: boolean;
  optionNoSelect: boolean;
  optionNoDelete: boolean;
  optionNoEditRemovePoint: boolean;
  optionNoEdit: boolean;
  optionNoEditDragPoint: boolean;
  optionNoEditDragInsertion: boolean;
  optionNoEditDragWhole: boolean;
  optionNoCrossingDetection: boolean;
  markingInstance: CanvasMarkingClassType | null;
  markingStats: MarkingStats | null;
  fullscreen: boolean; // TODO use useFullscreen hook
}
