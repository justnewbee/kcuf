import {
  DEFAULT_Z_INDEX
} from '../const';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';
 
export default function useZIndex(): number {
  const {
    zIndex = DEFAULT_Z_INDEX
  } = useModelProps();
  const {
    visible
  } = useModelState();
  
  return visible ? zIndex : -1;
}
