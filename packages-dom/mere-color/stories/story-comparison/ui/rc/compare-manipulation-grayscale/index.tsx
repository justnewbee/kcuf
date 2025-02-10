import {
  ReactElement
} from 'react';

import {
  useColor
} from '../../../model';
import {
  getComparisonGrayscale
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareManipulationGrayscale(): ReactElement {
  const color = useColor();
  
  return <>
    <GridTitle>grayscale(c)</GridTitle>
    {getComparisonGrayscale(color).map(v => <GridItem key={v.key} {...{
      color: v.result,
      result: v.result,
      code: v.code
    }} />)}
  </>;
}
