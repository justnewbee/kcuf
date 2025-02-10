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
  getComparisonMix
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareManipulationMix(): ReactElement {
  const color = useColor();
  const [stateColor2, setStateColor2] = useState('#0000ff');
  
  return <>
    <GridTitle>
      <span>mix(c1, c2)</span>
      <InputColor {...{
        value: stateColor2,
        onChange: setStateColor2
      }} />
    </GridTitle>
    {getComparisonMix(color, stateColor2).map(v => <GridItem key={v.key} {...{
      color: v.result,
      result: v.result,
      code: v.code
    }} />)}
  </>;
}
