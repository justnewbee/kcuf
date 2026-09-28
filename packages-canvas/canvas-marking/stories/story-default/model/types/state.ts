import {
  MarkingStats,
  CanvasMarkingClassType
} from '../../../../src';

export interface IModelState {
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
}
