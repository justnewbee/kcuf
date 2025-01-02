import {
  useMemo
} from 'react';

import {
  CanvasMarkingProps
} from '../../../src';
import {
  getHoveringInfo
} from '../util';

import useModelState from './_use-model-state';
import usePlugins from './use-plugins';
import useDispatchSetMarkingStats from './use-dispatch-set-marking-stats';

export default function useCanvasMarkingProps(): CanvasMarkingProps {
  const {
    image,
    markings,
    editable,
    debugEvents
  } = useModelState();
  const plugins = usePlugins();
  const dispatchSetMarkingStats = useDispatchSetMarkingStats();
  
  return useMemo(() => ({
    image,
    markings,
    plugins,
    tooltipOptions: {
      getHoveringInfo
    },
    editable,
    debugEvents,
    onStatsChange: dispatchSetMarkingStats
  }), [
    image,
    markings,
    plugins,
    editable,
    debugEvents,
    dispatchSetMarkingStats
  ]);
}
