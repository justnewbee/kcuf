import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';
import useFullscreen from '@kcuf-hook/use-fullscreen';

import {
  useInit,
  useMarkingInstance,
  useMarkingStats,
  useHandleDestroy,
  useHandleDebugStats
} from '../../model';

export default function OpsOverall(): ReactElement {
  const {
    fullscreen,
    toggle
  } = useFullscreen();
  const init = useInit();
  const markingInstance = useMarkingInstance();
  const markingStats = useMarkingStats();
  const handleDestroy = useHandleDestroy();
  const handleDebugStats = useHandleDebugStats();
  
  return <>
    <Button {...{
      label: fullscreen ? '退出全屏' : '进入全屏',
      onClick: toggle
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
