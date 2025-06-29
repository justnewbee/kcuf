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
  getComparisonGenerateTint
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareGenerateTint(): ReactElement {
  const color = useColor();
  const [statePercentage, setStatePercentage] = useState(30);
  
  return <>
    <GridTitle>
      <span>tint(c, {statePercentage})</span>
      <InputRange {...{
        min: 0,
        max: 100,
        value: statePercentage,
        onChange: setStatePercentage
      }} />
    </GridTitle>
    {getComparisonGenerateTint(color, statePercentage).map(v => <GridItem key={v.key} {...{
      color: v.result,
      result: v.result,
      code: v.code
    }} />)}
  </>;
}
