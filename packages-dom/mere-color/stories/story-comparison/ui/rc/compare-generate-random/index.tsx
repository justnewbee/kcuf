import {
  ReactElement
} from 'react';

import {
  getComparisonGenerateRandom
} from '../../util';
import GridTitle from '../grid-title';
import GridItem from '../grid-item';

export default function CompareGenerateRandom(): ReactElement {
  return <>
    <GridTitle>random()</GridTitle>
    {getComparisonGenerateRandom().map(v => <GridItem key={v.key} {...{
      color: v.result,
      result: v.result,
      code: v.code
    }} />)}
  </>;
}
