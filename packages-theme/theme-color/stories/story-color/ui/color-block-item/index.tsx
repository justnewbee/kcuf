import {
  ReactElement
} from 'react';
import {
  grayscale,
  invert
} from 'polished';

import {
  HslColorString,
  HslaColorString
} from '../../../../src';
import {
  ColorBlock
} from '../../../rc';
import {
  useStateDark,
  useStateText,
  useStatePolishedGrayscale,
  useStatePolishedInvert
} from '../../model';

interface IProps {
  color: HslColorString | HslaColorString;
}

export default function ColorBlockItem({
  color: color0
}: IProps): ReactElement {
  const [dark] = useStateDark();
  const [text] = useStateText();
  const [polishedGrayscale] = useStatePolishedGrayscale();
  const [polishedInvert] = useStatePolishedInvert();
  
  let color: string = color0;
  
  if (polishedGrayscale) {
    color = grayscale(color0);
  }
  
  if (polishedInvert) {
    color = invert(color0);
  }
  
  return <ColorBlock {...{
    color,
    dark,
    text
  }} />;
}
