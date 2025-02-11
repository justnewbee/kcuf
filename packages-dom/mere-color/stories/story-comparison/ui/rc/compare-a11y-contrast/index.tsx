import {
  ReactElement
} from 'react';

import {
  useColor
} from '../../../model';
import {
  getComparisonContrast
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

interface IProps {
  black?: boolean;
}

export default function CompareA11yContrast({
  black
}: IProps): ReactElement {
  const color = useColor();
  
  return <>
    <GridTitle>a11yContrast(c, {black ? 'black' : 'white'})</GridTitle>
    {getComparisonContrast(color, black).map(v => <GridItem key={v.key} {...{
      result: v.result,
      code: v.code
    }} />)}
  </>;
}
