import {
  useMemo
} from 'react';

import {
  ITransitionDurations
} from '../types';

import useModelProps from './_use-model-props';

export default function useDurations(): Required<ITransitionDurations> {
  const {
    duration
  } = useModelProps();
  
  return useMemo((): Required<ITransitionDurations> => {
    let durationAppear: number;
    let durationEnter: number;
    let durationExit: number;
    
    if (typeof duration === 'number') {
      durationAppear = duration;
      durationEnter = duration;
      durationExit = duration;
    } else {
      durationExit = duration?.exit ?? 0;
      durationEnter = duration?.enter ?? 0;
      durationAppear = duration?.appear ?? durationEnter;
    }
    
    return {
      appear: durationAppear,
      enter: durationEnter,
      exit: durationExit
    };
  }, [duration]);
}
