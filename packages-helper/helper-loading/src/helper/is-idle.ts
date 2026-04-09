import {
  ELoadingStatus
} from '../enum';
import {
  IWithLoading
} from '../types';

export default function isIdle(withLoading: IWithLoading<unknown>): boolean {
  return withLoading.loading === ELoadingStatus.IDLE;
}
