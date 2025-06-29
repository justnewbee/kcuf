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
} from '../../model';

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
      label: fullscreen ? '退出全屏' : '进入全屏',
      onClick: handleToggleFullscreen
    }} />
    <Button {...{
      label: markingInstance ? 'destroy' : 'init',
      onClick: markingInstance ? handleDestroy : init
    }} />
    {markingInstance ? <>
      <Button {...{
        label: `stats (${markingStats?.itemStatsList.length ?? 0})`,
        onClick: handleDebugStats
      }} />
    </> : null}
  </>;
}
