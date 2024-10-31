import {
  IKeyDetails
} from './common';

export interface IModelState {
  codes: string[];
  capsLock: boolean;
  keyDetails: IKeyDetails | null;
}
