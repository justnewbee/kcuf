import {
  ReactElement
} from 'react';

import {
  useColor
} from '../../../model';
import {
  getComparisonToRgb
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareToStringRgb(): ReactElement {
  const color = useColor();
  
  return <>
    <GridTitle>toStringRgb(c)</GridTitle>
    {getComparisonToRgb(color).map(v => <GridItem key={v.key} {...{
      color: v.result,
      result: v.result,
      code: v.code
    }} />)}
  </>;
}
