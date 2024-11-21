import {
  TMutableRefImperative
} from '../types';

import useModelContext from './_use-model-context';

export default function useRefImperative(): TMutableRefImperative {
  return useModelContext().refImperative;
}
