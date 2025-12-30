import {
  ELoadingStatus
} from '../enum';
import {
  IWithLoading
} from '../types';

export default function isLoading(withLoading: IWithLoading<unknown>): boolean {
  return withLoading.loading === ELoadingStatus.LOADING;
}
