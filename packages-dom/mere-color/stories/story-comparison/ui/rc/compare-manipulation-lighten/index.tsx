import {
  ReactElement,
  useState
} from 'react';

import {
  InputRange
} from '@kcuf/demo-rc';

import {
  useColor
} from '../../../model';
import {
  getComparisonLighten
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareManipulationLighten(): ReactElement {
  const color = useColor();
  const [stateAmount, setStateAmount] = useState(15);
  
  return <>
    <GridTitle>
      <span>lighten(c, {stateAmount})</span>
      <InputRange {...{
        min: 0,
        max: 100,
        value: stateAmount,
        onChange: setStateAmount
      }} />
    </GridTitle>
    {getComparisonLighten(color, stateAmount).map(v => <GridItem key={v.key} {...{
      color: v.result,
      result: v.result,
      code: v.code
    }} />)}
  </>;
}
