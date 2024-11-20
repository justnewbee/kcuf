import {
  ReactElement,
  useState,
  useEffect
} from 'react';

import {
  InputCheckbox
} from '@kcuf/demo-rc';

import {
  pluginCursor,
  pluginFps,
  pluginMagnet,
  pluginMove,
  pluginSnapping,
  pluginStats,
  pluginTooltip,
  pluginZoom
} from '../../../src';
import {
  useMarkingInstance
} from '../../demo-model';

export default function OpsPlugin(): ReactElement {
  const markingInstance = useMarkingInstance();
  const [statePluginCursor, setStatePluginCursor] = useState(true);
  const [statePluginFps, setStatePluginFps] = useState(true);
  const [statePluginMagnet, setStatePluginMagnet] = useState(true);
  const [statePluginMove, setStatePluginMove] = useState(true);
  const [statePluginSnapping, setStatePluginSnapping] = useState(true);
  const [statePluginStats, setStatePluginStats] = useState(true);
  const [statePluginTooltip, setStatePluginTooltip] = useState(true);
  const [statePluginZoom, setStatePluginZoom] = useState(true);
  
  useEffect(() => {
    if (markingInstance && statePluginCursor) {
      return markingInstance.registerPlugin(pluginCursor);
    }
  }, [markingInstance, statePluginCursor]);
  
  useEffect(() => {
    if (markingInstance && statePluginFps) {
      return markingInstance.registerPlugin(pluginFps);
    }
  }, [markingInstance, statePluginFps]);
  
  useEffect(() => {
    if (markingInstance && statePluginMagnet) {
      return markingInstance.registerPlugin(pluginMagnet);
    }
  }, [markingInstance, statePluginMagnet]);
  
  useEffect(() => {
    if (markingInstance && statePluginMove) {
      return markingInstance.registerPlugin(pluginMove);
    }
  }, [markingInstance, statePluginMove]);
  
  useEffect(() => {
    if (markingInstance && statePluginSnapping) {
      return markingInstance.registerPlugin(pluginSnapping);
    }
  }, [markingInstance, statePluginSnapping]);
  
  useEffect(() => {
    if (markingInstance && statePluginStats) {
      return markingInstance.registerPlugin(pluginStats);
    }
  }, [markingInstance, statePluginStats]);
  
  useEffect(() => {
    if (markingInstance && statePluginTooltip) {
      return markingInstance.registerPlugin(pluginTooltip);
    }
  }, [markingInstance, statePluginTooltip]);
  
  useEffect(() => {
    if (markingInstance && statePluginZoom) {
      return markingInstance.registerPlugin(pluginZoom);
    }
  }, [markingInstance, statePluginZoom]);
  
  return <>
    <InputCheckbox {...{
      label: 'pluginCursor',
      checked: statePluginCursor,
      onChange: setStatePluginCursor
    }} />
    <InputCheckbox {...{
      label: 'pluginFps',
      checked: statePluginFps,
      onChange: setStatePluginFps
    }} />
    <InputCheckbox {...{
      label: 'pluginMagnet',
      checked: statePluginMagnet,
      onChange: setStatePluginMagnet
    }} />
    <InputCheckbox {...{
      label: 'pluginMove',
      checked: statePluginMove,
      onChange: setStatePluginMove
    }} />
    <InputCheckbox {...{
      label: 'pluginSnapping',
      checked: statePluginSnapping,
      onChange: setStatePluginSnapping
    }} />
    <InputCheckbox {...{
      label: 'pluginStats',
      checked: statePluginStats,
      onChange: setStatePluginStats
    }} />
    <InputCheckbox {...{
      label: 'pluginTooltip',
      checked: statePluginTooltip,
      onChange: setStatePluginTooltip
    }} />
    <InputCheckbox {...{
      label: 'pluginZoom',
      checked: statePluginZoom,
      onChange: setStatePluginZoom
    }} />
  </>;
}
