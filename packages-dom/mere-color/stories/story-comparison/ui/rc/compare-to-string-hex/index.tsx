import {
  ReactElement
} from 'react';

import {
  useColor
} from '../../../model';
import {
  getComparisonToHex
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareToStringHex(): ReactElement {
  const color = useColor();
  
  return <>
    <GridTitle>toStringHex(c)</GridTitle>
    {getComparisonToHex(color).map(v => <GridItem key={v.key} {...{
      color: v.result,
      result: v.result,
      code: v.code
    }} />)}
  </>;
}
