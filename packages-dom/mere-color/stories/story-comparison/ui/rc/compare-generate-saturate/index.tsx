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
  getComparisonGenerateSaturate
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareGenerateSaturate(): ReactElement {
  const color = useColor();
  const [stateAmount, setStateAmount] = useState(15);
  
  return <>
    <GridTitle>
      <span>saturate(c, {stateAmount})</span>
      <InputRange {...{
        min: 0,
        max: 100,
        value: stateAmount,
        onChange: setStateAmount
      }} />
    </GridTitle>
    {getComparisonGenerateSaturate(color, stateAmount).map(v => <GridItem key={v.key} {...{
      color: v.result,
      result: v.result,
      code: v.code
    }} />)}
  </>;
}
