import _noop from 'lodash/noop';
import {
  useMemo
} from 'react';

import {
  MarkingStats
} from '@kcuf/canvas-marking';

import {
  IImperativeRef
} from '../types';

import useMarkingInstance from './use-marking-instance';

export default function useImperativeRef(): IImperativeRef {
  const markingInstance = useMarkingInstance();
  
  return useMemo((): IImperativeRef => ({
    getStats(): MarkingStats | null {
      return markingInstance ? markingInstance.getStats() : null;
    },
    startCreating: markingInstance ? markingInstance.startCreating.bind(markingInstance) : _noop,
    cancelCreating: markingInstance ? markingInstance.cancelCreating.bind(markingInstance) : _noop,
    select: markingInstance ? markingInstance.select.bind(markingInstance) : _noop,
    highlight: markingInstance ? markingInstance.highlight.bind(markingInstance) : _noop,
    toggleMove: markingInstance ? markingInstance.toggleMove.bind(markingInstance) : _noop,
    zoom: markingInstance ? markingInstance.zoom.bind(markingInstance) : _noop,
    draw: markingInstance ? markingInstance.draw.bind(markingInstance) : _noop,
    on: markingInstance ? markingInstance.on.bind(markingInstance) : () => _noop
  }), [markingInstance]);
}
