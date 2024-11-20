import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import { ZoomHow } from '../../../src';
import {
  useHandleZoom
} from '../../demo-model';

export default function OpsZoom(): ReactElement {
  const handleZoom = useHandleZoom();
  
  return <div>
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
  </div>;
}
