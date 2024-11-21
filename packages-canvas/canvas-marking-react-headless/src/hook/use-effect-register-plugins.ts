import {
  useEffect
} from 'react';

import {
  pluginCursor,
  pluginTooltip,
  pluginMagnet,
  pluginSnapping,
  pluginZoom,
  pluginMove,
  pluginStats,
  pluginFps
} from '@kcuf/canvas-marking';

import useModelProps from './_use-model-props';
import useMarkingInstance from './use-marking-instance';

export default function useEffectRegisterPlugins(): void {
  const {
    plugins: {
      cursor = true,
      tooltip = true,
      magnet = true,
      snapping = true,
      zoom = true,
      move = true,
      stats,
      fps
    } = {}
  } = useModelProps();
  const markingInstance = useMarkingInstance();
  
  useEffect(() => {
    if (markingInstance && cursor) {
      return markingInstance.registerPlugin(pluginCursor);
    }
  }, [markingInstance, cursor]);
  
  useEffect(() => {
    if (markingInstance && tooltip) {
      return markingInstance.registerPlugin(pluginTooltip);
    }
  }, [markingInstance, tooltip]);
  
  useEffect(() => {
    if (markingInstance && magnet) {
      return markingInstance.registerPlugin(pluginMagnet);
    }
  }, [markingInstance, magnet]);
  
  useEffect(() => {
    if (markingInstance && snapping) {
      return markingInstance.registerPlugin(pluginSnapping);
    }
  }, [markingInstance, snapping]);
  
  useEffect(() => {
    if (markingInstance && zoom) {
      return markingInstance.registerPlugin(pluginZoom);
    }
  }, [markingInstance, zoom]);
  
  useEffect(() => {
    if (markingInstance && move) {
      return markingInstance.registerPlugin(pluginMove);
    }
  }, [markingInstance, move]);
  
  useEffect(() => {
    if (markingInstance && stats) {
      return markingInstance.registerPlugin(pluginStats);
    }
  }, [markingInstance, stats]);
  
  useEffect(() => {
    if (markingInstance && fps) {
      return markingInstance.registerPlugin(pluginFps);
    }
  }, [markingInstance, fps]);
}
