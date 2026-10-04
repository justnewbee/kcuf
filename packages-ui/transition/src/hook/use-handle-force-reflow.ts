import {
  forceReflow
} from '@kcuf/mere-dom';

import useModelProps from './_use-model-props';

export default function useHandleForceReflow(): () => void {
  const {
    nodeRef,
    mountOnEnter,
    unmountOnExit
  } = useModelProps();
  
  return () => {
    if (unmountOnExit || mountOnEnter) {
      const node = nodeRef?.current;
      
      if (node) {
        forceReflow(node);
      }
    }
  };
}
