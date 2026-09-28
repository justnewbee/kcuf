import _noop from 'lodash/noop';
import {
  useImperativeHandle
} from 'react';

import {
  MarkingStats
} from '@kcuf/canvas-marking';

import {
  IModelImperative
} from '../types';

import useMarkingInstance from './use-marking-instance';
import useModelContext from './_use-model-context';

export default function useImperative(): void {
  const {
    ref
  } = useModelContext();
  const markingInstance = useMarkingInstance();
  
  useImperativeHandle(ref, (): IModelImperative => ({
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
