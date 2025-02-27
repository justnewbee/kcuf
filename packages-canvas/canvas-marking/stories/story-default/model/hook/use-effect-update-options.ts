import {
  useEffect
} from 'react';

import useModelState from './_use-model-state';
import useMarkingInstance from './use-marking-instance';

export default function useEffectUpdateOptions(): void {
  const {
    optionDebugEvents,
    optionNoHover,
    optionNoClick,
    optionNoSelect,
    optionNoDelete,
    optionNoEditRemovePoint,
    optionNoEdit,
    optionNoEditDragPoint,
    optionNoEditDragInsertion,
    optionNoEditDragWhole,
    optionNoCrossingDetection
  } = useModelState();
  const markingInstance = useMarkingInstance();
  
  useEffect((): void => {
    if (optionDebugEvents) {
      localStorage.debug = 'canvas-marking';
    } else {
      delete localStorage.debug;
    }
  }, [optionDebugEvents]);
  
  useEffect((): void => markingInstance?.updateOptions({
    debugEvents: optionDebugEvents,
    noHover: optionNoHover,
    noClick: optionNoClick,
    noSelect: optionNoSelect,
    noDelete: optionNoDelete,
    noEditRemovePoint: optionNoEditRemovePoint,
    noEdit: optionNoEdit,
    noEditDragPoint: optionNoEditDragPoint,
    noEditDragInsertion: optionNoEditDragInsertion,
    noEditDragWhole: optionNoEditDragWhole,
    noCrossingDetection: optionNoCrossingDetection
  }), [
    markingInstance,
    optionDebugEvents,
    optionNoHover,
    optionNoClick,
    optionNoSelect,
    optionNoDelete,
    optionNoEditRemovePoint,
    optionNoEdit,
    optionNoEditDragPoint,
    optionNoEditDragInsertion,
    optionNoEditDragWhole,
    optionNoCrossingDetection
  ]);
}
