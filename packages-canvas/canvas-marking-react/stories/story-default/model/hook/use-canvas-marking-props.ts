import {
  useMemo
} from 'react';

import {
  CanvasMarkingProps
} from '../../../../src';
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
    debugEvents
  } = useModelState();
  const plugins = usePlugins();
  const dispatchSetMarkingStats = useDispatchSetMarkingStats();
  
  return useMemo(() => ({
    image,
    markings,
    plugins,
    debugEvents,
    tooltipOptions: {
      getHoveringInfo
    },
    onStatsChange: dispatchSetMarkingStats
  }), [
    image,
    markings,
    plugins,
    debugEvents,
    dispatchSetMarkingStats
  ]);
}
