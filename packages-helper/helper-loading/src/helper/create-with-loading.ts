import {
  ELoadingStatus
} from '../enum';
import {
  IWithLoading
} from '../types';

export default function createWithLoading<T>(data?: T | null, loading = ELoadingStatus.IDLE, error?: Error | null): IWithLoading<T> {
  return {
    loading,
    data,
    error
  };
}
