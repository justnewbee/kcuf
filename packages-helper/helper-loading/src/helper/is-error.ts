import {
  ELoadingStatus
} from '../enum';
import {
  IWithLoading
} from '../types';

export default function isError(withLoading: IWithLoading<unknown>): boolean {
  return withLoading.loading === ELoadingStatus.ERROR;
}
