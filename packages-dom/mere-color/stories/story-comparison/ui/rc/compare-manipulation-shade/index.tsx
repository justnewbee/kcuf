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
  getComparisonShade
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareManipulationShade(): ReactElement {
  const color = useColor();
  const [statePercentage, setStatePercentage] = useState(30);
  
  return <>
    <GridTitle>
      <span>shade(c, {statePercentage})</span>
      <InputRange {...{
        min: 0,
        max: 100,
        value: statePercentage,
        onChange: setStatePercentage
      }} />
    </GridTitle>
    {getComparisonShade(color, statePercentage).map(v => <GridItem key={v.key} {...{
      color: v.result,
      result: v.result,
      code: v.code
    }} />)}
  </>;
}
