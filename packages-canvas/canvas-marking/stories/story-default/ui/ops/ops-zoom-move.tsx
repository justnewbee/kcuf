import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import {
  ZoomHow
} from '../../../../src';
import {
  useMarkingStats,
  useHandleZoom,
  useHandleToggleMove
} from '../../model';

export default function OpsZoomMove(): ReactElement {
  const markingStats = useMarkingStats();
  const handleZoom = useHandleZoom();
  const handleToggleMove = useHandleToggleMove();
  
  return <>
    <Button {...{
      label: 'zoom-',
      onClick: () => handleZoom(ZoomHow.OUT)
    }} />
    <Button {...{
      label: 'zoom+',
      onClick: () => handleZoom(ZoomHow.IN)
    }} />
    <Button {...{
      label: 'zoom min',
      onClick: () => handleZoom(ZoomHow.MIN)
    }} />
    <Button {...{
      label: 'zoom max',
      onClick: () => handleZoom(ZoomHow.MAX)
    }} />
    <Button {...{
      label: 'zoom reset',
      onClick: () => handleZoom(ZoomHow.RESET)
    }} />
    <Button {...{
      label: markingStats?.movingInfo.started ? 'moving...' : 'move',
      onClick: handleToggleMove
    }} />
  </>;
}
