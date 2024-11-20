import {
  MarkingStageClassType
} from '@kcuf/canvas-marking';

export interface IModelState {
  domContainer: HTMLDivElement | null;
  markingInstance: MarkingStageClassType | null;
}
