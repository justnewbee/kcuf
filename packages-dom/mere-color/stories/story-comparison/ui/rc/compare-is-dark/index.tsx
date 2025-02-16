import {
  ReactElement
} from 'react';

import {
  useColor
} from '../../../model';
import {
  getComparisonIsDark
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareIsDark(): ReactElement {
  const color = useColor();
  
  return <>
    <GridTitle>isDark(c)</GridTitle>
    {getComparisonIsDark(color).map(v => <GridItem key={v.key} {...{
      result: v.result === null ? null : v.result ? '✅' : '❌',
      code: v.code
    }} />)}
  </>;
}
