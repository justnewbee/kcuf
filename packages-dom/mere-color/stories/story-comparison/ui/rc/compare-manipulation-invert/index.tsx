import {
  ReactElement
} from 'react';

import {
  useColor
} from '../../../model';
import {
  getComparisonInvert
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareManipulationInvert(): ReactElement {
  const color = useColor();
  
  return <>
    <GridTitle>invert(c)</GridTitle>
    {getComparisonInvert(color).map(v => <GridItem key={v.key} {...{
      color: v.result,
      result: v.result,
      code: v.code
    }} />)}
  </>;
}
