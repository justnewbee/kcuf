import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import {
  useHandleSetDataAerial,
  useHandleSetDataSexy,
  useHandleSetDataNoImage,
  useHandleSetDataEmpty
} from '../../demo-model';

export default function OpsImageData(): ReactElement {
  const handleSetDataAerial = useHandleSetDataAerial();
  const handleSetDataSexy = useHandleSetDataSexy();
  const handleSetDataNoImage = useHandleSetDataNoImage();
  const handleSetDataEmpty = useHandleSetDataEmpty();
  
  return <div>
    <Button {...{
      onClick: handleSetDataAerial
    }}>航拍图</Button>
    <Button {...{
      onClick: handleSetDataSexy
    }}>性感图</Button>
    <Button {...{
      onClick: handleSetDataNoImage
    }}>无图</Button>
    <Button {...{
      onClick: handleSetDataEmpty
    }}>空</Button>
  </div>;
}
