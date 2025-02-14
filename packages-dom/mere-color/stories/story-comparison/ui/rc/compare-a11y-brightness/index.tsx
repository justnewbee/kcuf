import {
  ReactElement
} from 'react';

import {
  useColor
} from '../../../model';
import {
  getComparisonA11yBrightness
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareA11yBrightness(): ReactElement {
  const color = useColor();
  
  return <>
    <GridTitle>a11yBrightness(c)</GridTitle>
    {getComparisonA11yBrightness(color).map(v => <GridItem key={v.key} {...{
      result: v.result,
      code: v.code
    }} />)}
  </>;
}
