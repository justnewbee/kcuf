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
  useStateSeedColorful
} from '../../model';
import ColorBlockItem from '../color-block-item';

export default function GenerateColorful(): ReactElement {
  const [dark] = useStateDark();
  const [seedColorful, setSeedColorful] = useStateSeedColorful();
  
  return <>
    <ColorBlockBase>
      <InputColor {...{
        withAlpha: false,
        value: seedColorful,
        onChange: setSeedColorful
      }} />
    </ColorBlockBase>
    {generateColorLevel(seedColorful, {
      dark
    }).map((v, i) => <ColorBlockItem key={`${v}-${i}`} color={v} />)}
  </>;
}
