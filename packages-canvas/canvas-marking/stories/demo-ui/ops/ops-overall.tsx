import {
  ReactElement
} from 'react';

import {
  Button,
  InputSwitch
} from '@kcuf/demo-rc';

import {
  useMarkingStage,
  useLogEvents,
  useFullscreen,
  useFloatingVisible,
  useHandleInit,
  useHandleDestroy,
  useHandleToggleFullscreen,
  useHandleToggleFloatingVisible,
  useHandleToggleDisabled,
  useHandleDebugStats,
  useMarkingStageStats,
  useHandleToggleLogEvents
} from '../../demo-model';

export default function OpsOverall(): ReactElement {
  const markingStage = useMarkingStage();
  const markingStageStats = useMarkingStageStats();
  const fullscreen = useFullscreen();
  const logEvents = useLogEvents();
  const floatingVisible = useFloatingVisible();
  const handleToggleFullscreen = useHandleToggleFullscreen();
  const handleToggleLogEvents = useHandleToggleLogEvents();
  const handleToggleFloatingVisible = useHandleToggleFloatingVisible();
  const handleToggleDisabled = useHandleToggleDisabled();
  const handleInit = useHandleInit();
  const handleDestroy = useHandleDestroy();
  const handleDebugStats = useHandleDebugStats();
  
  return <div>
    <Button {...{
      onClick: handleToggleFullscreen
    }}>{fullscreen ? '退出全屏' : '进入全屏'}</Button>
    <Button {...{
      onClick: markingStage ? handleDestroy : handleInit
    }}>{markingStage ? 'destroy' : 'init'}</Button>
    {markingStage ? <>
      <Button {...{
        onClick: handleDebugStats
      }}>stats</Button>
      <Button {...{
        onClick: handleToggleDisabled
      }}>{markingStageStats?.disabled ? 'enable' : 'disable'}</Button>
      <InputSwitch {...{
        label: '浮动按钮',
        value: floatingVisible,
        onChange: handleToggleFloatingVisible
      }} />
      <InputSwitch {...{
        label: '打印事件（TODO options.onXx 还没有好）',
        value: logEvents,
        onChange: handleToggleLogEvents
      }} />
    </> : null}
  </div>;
}