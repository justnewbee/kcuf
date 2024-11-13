import {
  ELoading
} from '../enum';
import {
  IPromiseResult
} from '../types';

export const DEFAULT_RESULT: IPromiseResult = {
  loading: ELoading.IDLE,
  result: null
};
