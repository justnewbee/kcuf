import {
  ReactElement
} from 'react';

import {
  useColor
} from '../../../model';
import {
  getComparisonGenerateInvert
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareGenerateInvert(): ReactElement {
  const color = useColor();
  
  return <>
    <GridTitle>invert(c)</GridTitle>
    {getComparisonGenerateInvert(color).map(v => <GridItem key={v.key} {...{
      color: v.result,
      result: v.result,
      code: v.code
    }} />)}
  </>;
}
