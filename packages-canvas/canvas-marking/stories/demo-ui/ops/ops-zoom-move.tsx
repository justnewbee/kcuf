import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import {
  ZoomHow
} from '../../../src';
import {
  useMarkingStats,
  useHandleZoom,
  useHandleToggleMove
} from '../../demo-model';

export default function OpsZoomMove(): ReactElement {
  const markingStats = useMarkingStats();
  const handleZoom = useHandleZoom();
  const handleToggleMove = useHandleToggleMove();
  
  return <>
    <Button {...{
      onClick: () => handleZoom(ZoomHow.OUT)
    }}>zoom-</Button>
    <Button {...{
      onClick: () => handleZoom(ZoomHow.IN)
    }}>zoom+</Button>
    <Button {...{
      onClick: () => handleZoom(ZoomHow.MIN)
    }}>zoom min</Button>
    <Button {...{
      onClick: () => handleZoom(ZoomHow.MAX)
    }}>zoom max</Button>
    <Button {...{
      onClick: () => handleZoom(ZoomHow.RESET)
    }}>zoom reset</Button>
    <Button {...{
      onClick: handleToggleMove
    }}>{markingStats?.moving ? 'moving...' : 'move'}</Button>
  </>;
}
