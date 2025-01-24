import {
  ReactElement
} from 'react';
import {
  grayscale as polishedGrayscale
} from 'polished';

import {
  Hsl,
  Hsla
} from '../../../../src';
import {
  ColorBlock
} from '../../../rc';
import {
  useStateDark,
  useStateText,
  useStateGrayscale
} from '../../model';

interface IProps {
  color: Hsl | Hsla;
  text?: boolean;
  dark?: boolean;
}

export default function ColorBlockItem({
  color: color0
}: IProps): ReactElement {
  const [dark] = useStateDark();
  const [text] = useStateText();
  const [grayscale] = useStateGrayscale();
  
  return <ColorBlock {...{
    color: grayscale ? polishedGrayscale(color0) : color0,
    dark,
    text
  }} />;
}
