import {
  ETransitionStatus
} from '../enum';

export interface IModelState {
  /**
   * children 是否已渲染
   */
  mounted: boolean;
  status: ETransitionStatus;
  timer: ReturnType<typeof setTimeout> | null;
}
