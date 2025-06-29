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
  getComparisonGenerateRotate
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareGenerateRotate(): ReactElement {
  const color = useColor();
  const [stateAmount, setStateAmount] = useState(45);
  
  return <>
    <GridTitle>
      <span>rotate(c, {stateAmount})</span>
      <InputRange {...{
        min: -360,
        max: 360,
        value: stateAmount,
        onChange: setStateAmount
      }} />
    </GridTitle>
    {getComparisonGenerateRotate(color, stateAmount).map(v => <GridItem key={v.key} {...{
      color: v.result,
      result: v.result,
      code: v.code
    }} />)}
  </>;
}
