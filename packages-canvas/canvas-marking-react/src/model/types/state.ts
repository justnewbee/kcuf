import {
  MarkingStageStats,
  MarkingStageClassType
} from '@kcuf/canvas-marking';

export interface IModelState {
  domContainer: HTMLDivElement | null;
  markingInstance: MarkingStageClassType | null;
  
  everInit: boolean;
  
  markingInstanceStats: MarkingStageStats | null;
  logEvents: boolean;
  fullscreen: boolean; // TODO use useFullscreen hook
}
