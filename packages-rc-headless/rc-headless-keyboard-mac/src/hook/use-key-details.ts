import {
  IKeyDetails
} from '../types';

import useModelState from './_use-model-state';

export default function useKeyDetails(): IKeyDetails | null {
  return useModelState().keyDetails;
}