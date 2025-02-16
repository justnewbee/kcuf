import {
  ReactElement
} from 'react';

import {
  useColor
} from '../../../model';
import {
  getComparisonIsLight
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareIsLight(): ReactElement {
  const color = useColor();
  
  return <>
    <GridTitle>isLight(c)</GridTitle>
    {getComparisonIsLight(color).map(v => <GridItem key={v.key} {...{
      result: v.result === null ? null : v.result ? '✅' : '❌',
      code: v.code
    }} />)}
  </>;
}
