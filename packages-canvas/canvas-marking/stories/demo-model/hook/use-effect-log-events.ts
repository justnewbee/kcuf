import {
  useEffect
} from 'react';

import {
  generateCallback
} from '../util';

import useModelState from './_use-model-state';

export default function useEffectLogEvents(): void {
  const {
    markingStage,
    logEvents
  } = useModelState();
  
  useEffect(() => {
    if (!markingStage || !logEvents) {
      return;
    }
    
    return markingStage.on({
      'create-start': generateCallback('create-start'),
      'create-cancel': generateCallback('create-cancel'),
      'create-complete': generateCallback('create-complete'),
      click: generateCallback('click'),
      'selection-change': generateCallback('selection-change'),
      'point-remove': generateCallback('point-remove'),
      'point-insert': generateCallback('point-insert'),
      'drag-end': generateCallback('drag-end'),
      'edit-cancel': generateCallback('edit-cancel'),
      'edit-complete': generateCallback('edit-complete'),
      delete: generateCallback('delete'),
      'zoom-change': generateCallback('zoom-change'),
      'move-start': generateCallback('move-start'),
      'move-pause': generateCallback('move-pause'),
      'move-end': generateCallback('move-end')
    });
  }, [markingStage, logEvents]);
}
