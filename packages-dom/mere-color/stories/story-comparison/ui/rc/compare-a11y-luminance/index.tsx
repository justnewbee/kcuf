import {
  ReactElement
} from 'react';

import {
  useColor
} from '../../../model';
import {
  getComparisonLuminance
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareA11yLuminance(): ReactElement {
  const color = useColor();
  
  return <>
    <GridTitle>a11yLuminance(c)</GridTitle>
    {getComparisonLuminance(color).map(v => <GridItem key={v.key} {...{
      result: v.result,
      code: v.code
    }} />)}
  </>;
}
