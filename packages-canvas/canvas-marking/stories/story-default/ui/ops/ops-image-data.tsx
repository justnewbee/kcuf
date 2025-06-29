import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import {
  useHandleSetDataAerial,
  useHandleSetDataSexy,
  useHandleSetDataBadImage,
  useHandleSetDataNoImage,
  useHandleSetDataEmpty
} from '../../model';

export default function OpsImageData(): ReactElement {
  const handleSetDataAerial = useHandleSetDataAerial();
  const handleSetDataSexy = useHandleSetDataSexy();
  const handleSetDataBadImage = useHandleSetDataBadImage();
  const handleSetDataNoImage = useHandleSetDataNoImage();
  const handleSetDataEmpty = useHandleSetDataEmpty();
  
  return <>
    <Button {...{
      label: '航拍图',
      onClick: handleSetDataAerial
    }} />
    <Button {...{
      label: '性感图',
      onClick: handleSetDataSexy
    }} />
    <Button {...{
      label: '坏图',
      onClick: handleSetDataBadImage
    }} />
    <Button {...{
      label: '无图',
      onClick: handleSetDataNoImage
    }} />
    <Button {...{
      label: '空',
      onClick: handleSetDataEmpty
    }} />
  </>;
}
