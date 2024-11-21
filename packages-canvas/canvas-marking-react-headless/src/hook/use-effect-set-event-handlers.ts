import {
  useEffect
} from 'react';

import useModelProps from './_use-model-props';
import useMarkingInstance from './use-marking-instance';

export default function useEffectSetEventHandlers(): void {
  const {
    onCreateStart,
    onCreateCancel,
    onBeforeCreateComplete,
    onCreateComplete,
    onClick,
    onSelectionChange,
    onPointRemove,
    onPointInsert,
    onBeforeEditDragEnd,
    onDragEnd,
    onEditCancel,
    onEditComplete,
    onDelete,
    onZoomChange,
    onMoveStart,
    onMovePause,
    onMoveEnd,
    onStatsChange
  } = useModelProps();
  const markingInstance = useMarkingInstance();
  
  useEffect(() => {
    if (!markingInstance) {
      return;
    }
    
    markingInstance.setOption('onCreateStart', onCreateStart);
    markingInstance.setOption('onCreateCancel', onCreateCancel);
    markingInstance.setOption('onBeforeCreateComplete', onBeforeCreateComplete);
    markingInstance.setOption('onCreateComplete', onCreateComplete);
    markingInstance.setOption('onClick', onClick);
    markingInstance.setOption('onSelectionChange', onSelectionChange);
    markingInstance.setOption('onPointRemove', onPointRemove);
    markingInstance.setOption('onPointInsert', onPointInsert);
    markingInstance.setOption('onBeforeEditDragEnd', onBeforeEditDragEnd);
    markingInstance.setOption('onDragEnd', onDragEnd);
    markingInstance.setOption('onEditCancel', onEditCancel);
    markingInstance.setOption('onEditComplete', onEditComplete);
    markingInstance.setOption('onDelete', onDelete);
    markingInstance.setOption('onZoomChange', onZoomChange);
    markingInstance.setOption('onMoveStart', onMoveStart);
    markingInstance.setOption('onMovePause', onMovePause);
    markingInstance.setOption('onMoveEnd', onMoveEnd);
    markingInstance.setOption('onStatsChange', onStatsChange);
  }, [
    markingInstance,
    onCreateStart,
    onCreateCancel,
    onBeforeCreateComplete,
    onCreateComplete,
    onClick,
    onSelectionChange,
    onPointRemove,
    onPointInsert,
    onBeforeEditDragEnd,
    onDragEnd,
    onEditCancel,
    onEditComplete,
    onDelete,
    onZoomChange,
    onMoveStart,
    onMovePause,
    onMoveEnd,
    onStatsChange
  ]);
}
