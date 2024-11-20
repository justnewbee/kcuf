import {
  CanvasMarkingClassType
} from '@kcuf/canvas-marking';

export interface IModelState {
  domContainer: HTMLDivElement | null;
  markingInstance: CanvasMarkingClassType | null;
}
