import {
  MarkingStageStats,
  MarkingStageClassType
} from '../../../src';

export interface IModelState {
  everInit: boolean;
  domContainer: HTMLDivElement | null;
  domMarking: HTMLDivElement | null;
  markingStage: MarkingStageClassType | null;
  markingStageStats: MarkingStageStats | null;
  logEvents: boolean;
  fullscreen: boolean; // TODO use useFullscreen hook
}
