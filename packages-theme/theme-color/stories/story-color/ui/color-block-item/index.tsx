import {
  ReactElement
} from 'react';

import {
  invert as transformInvert,
  grayscale as transformGrayscale
} from '@kcuf/mere-color';

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
  useStateGrayscale,
  useStateInvert
} from '../../model';

interface IProps {
  color: HslColorString | HslaColorString;
}

export default function ColorBlockItem({
  color: color0
}: IProps): ReactElement {
  const [dark] = useStateDark();
  const [text] = useStateText();
  const [grayscale] = useStateGrayscale();
  const [invert] = useStateInvert();
  
  let color: string = color0;
  
  if (grayscale) {
    color = transformGrayscale(color0);
  }
  
  if (invert) {
    color = transformInvert(color0);
  }
  
  return <ColorBlock {...{
    color,
    dark,
    text
  }} />;
}
