import {
  ELoading
} from '../enum';

export interface IPromiseViewerProps {
  promise?: Promise<unknown> | null;
}

export interface IPromiseResult {
  loading: ELoading;
  result: unknown;
  duration?: number;
}
