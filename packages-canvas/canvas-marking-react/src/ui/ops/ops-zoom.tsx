import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import {
  useHandleZoomIn,
  useHandleZoomOut,
  useHandleZoomReset
} from '../../model';

export default function OpsZoom(): ReactElement {
  const handleZoomIn = useHandleZoomIn();
  const handleZoomOut = useHandleZoomOut();
  const handleZoomReset = useHandleZoomReset();
  
  return <div>
    <Button {...{
      onClick: handleZoomOut
    }}>zoom-</Button>
    <Button {...{
      onClick: handleZoomIn
    }}>zoom+</Button>
    <Button {...{
      onClick: handleZoomReset
    }}>zoom reset</Button>
  </div>;
}
