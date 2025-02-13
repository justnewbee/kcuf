import {
  ReactElement
} from 'react';

import {
  useColor
} from '../../../model';
import {
  getComparisonGenerateGrayscale
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareGenerateGrayscale(): ReactElement {
  const color = useColor();
  
  return <>
    <GridTitle>grayscale(c)</GridTitle>
    {getComparisonGenerateGrayscale(color).map(v => <GridItem key={v.key} {...{
      color: v.result,
      result: v.result,
      code: v.code
    }} />)}
  </>;
}
