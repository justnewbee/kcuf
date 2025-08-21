import {
  ELoadingStatus
} from '../enum';

export interface IWithLoading<T> {
  loading: ELoadingStatus;
  data: T | null | undefined;
  error: Error | null | undefined;
}
