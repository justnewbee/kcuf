import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import {
  useInit,
  useMarkingInstance,
  useMarkingStats,
  useFullscreen,
  useHandleDestroy,
  useHandleToggleFullscreen,
  useHandleDebugStats
} from '../../demo-model';

export default function OpsOverall(): ReactElement {
  const init = useInit();
  const markingInstance = useMarkingInstance();
  const markingStats = useMarkingStats();
  const fullscreen = useFullscreen();
  const handleToggleFullscreen = useHandleToggleFullscreen();
  const handleDestroy = useHandleDestroy();
  const handleDebugStats = useHandleDebugStats();
  
  return <>
    <Button {...{
      onClick: handleToggleFullscreen
    }}>{fullscreen ? '退出全屏' : '进入全屏'}</Button>
    <Button {...{
      onClick: markingInstance ? handleDestroy : init
    }}>{markingInstance ? 'destroy' : 'init'}</Button>
    {markingInstance ? <>
      <Button {...{
        onClick: handleDebugStats
      }}>stats ({markingStats?.itemStatsList.length ?? 0})</Button>
    </> : null}
  </>;
}
