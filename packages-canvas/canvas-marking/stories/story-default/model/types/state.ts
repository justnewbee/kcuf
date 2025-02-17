import {
  Editable,
  MarkingStats,
  CanvasMarkingClassType
} from '../../../../src';

export interface IModelState {
  domContainer: HTMLDivElement | null;
  domMarking: HTMLDivElement | null;
  everInit: boolean;
  optionEditable: Editable;
  optionDebugEvents: boolean;
  markingInstance: CanvasMarkingClassType | null;
  markingStats: MarkingStats | null;
  fullscreen: boolean; // TODO use useFullscreen hook
}
