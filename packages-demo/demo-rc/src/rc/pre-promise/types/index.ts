import {
  ELoading
} from '../enum';

export interface IPrePromiseProps {
  promise?: Promise<unknown> | null;
}

export interface IPromiseResult {
  loading: ELoading;
  result: unknown;
  duration?: number;
}