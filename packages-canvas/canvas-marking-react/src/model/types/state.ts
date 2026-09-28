import {
  CanvasMarkingClassType
} from '@kcuf/canvas-marking';

export interface IModelState<T = unknown> {
  markingInstance: CanvasMarkingClassType<T> | null;
}
