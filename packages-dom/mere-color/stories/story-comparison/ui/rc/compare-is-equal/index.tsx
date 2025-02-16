import {
  ReactElement, useState
} from 'react';

import {
  InputColor
} from '@kcuf/demo-rc';

import {
  useColor
} from '../../../model';
import {
  getComparisonIsEqual
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareIsEqual(): ReactElement {
  const color = useColor();
  const [stateColor2, setStateColor2] = useState('#f00');
  
  return <>
    <GridTitle>
      <span>isEqual(c1, c2)</span>
      <InputColor {...{
        value: stateColor2,
        onChange: setStateColor2
      }} />
    </GridTitle>
    {getComparisonIsEqual(color, stateColor2).map(v => <GridItem key={v.key} {...{
      result: v.result === null ? null : v.result ? '✅' : '❌',
      code: v.code
    }} />)}
  </>;
}
