import {
  ReactElement
} from 'react';

import {
  InputColor
} from '@kcuf/demo-rc';

import {
  ColorBlockBase
} from '../../../rc';
import {
  generateColorLevel
} from '../../../util';
import {
  useStateDark,
  useStateSeedGray
} from '../../model';
import ColorBlockItem from '../color-block-item';

export default function GenerateGray(): ReactElement {
  const [dark] = useStateDark();
  const [seedGray, setSeedGray] = useStateSeedGray();
  
  return <>
    <ColorBlockBase>
      <InputColor {...{
        withAlpha: false,
        value: seedGray,
        onChange: setSeedGray
      }} />
    </ColorBlockBase>
    {generateColorLevel(seedGray, {
      gray: true,
      dark
    }).map((v, i) => <ColorBlockItem key={`${v}-${i}`} color={v} />)}
  </>;
}
