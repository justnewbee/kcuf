import {
  ReactElement
} from 'react';

import {
  useColor
} from '../../../model';
import {
  getComparisonToHsl
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareToStringHsl(): ReactElement {
  const color = useColor();
  
  return <>
    <GridTitle>toStringHsl(c)</GridTitle>
    {getComparisonToHsl(color).map(v => <GridItem key={v.key} {...{
      color: v.result,
      result: v.result,
      code: v.code
    }} />)}
  </>;
}
