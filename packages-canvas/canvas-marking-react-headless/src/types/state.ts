import {
  CanvasMarkingClassType
} from '@kcuf/canvas-marking';

export interface IModelState<T = unknown> {
  domContainer: HTMLDivElement | null;
  markingInstance: CanvasMarkingClassType<T> | null;
}
