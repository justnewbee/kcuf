import {
  CanvasMarkingStats,
  CanvasMarkingClassType
} from '../../../src';

export interface IModelState {
  everInit: boolean;
  domContainer: HTMLDivElement | null;
  domMarking: HTMLDivElement | null;
  markingInstance: CanvasMarkingClassType | null;
  markingStats: CanvasMarkingStats | null;
  logEvents: boolean;
  fullscreen: boolean; // TODO use useFullscreen hook
}
