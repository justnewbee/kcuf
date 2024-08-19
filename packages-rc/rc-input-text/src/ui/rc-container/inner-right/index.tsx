import {
  ReactElement
} from 'react';

import {
  useProps,
  useFocused
} from '@kcuf/rc-headless-input-text';

import {
  ScInputInnerRight
} from '../../sc';

export default function InnerRight(): ReactElement | null {
  const {
    innerRight
  } = useProps();
  const focused = useFocused();
  
  return innerRight ? <ScInputInnerRight focused={focused}>{innerRight}</ScInputInnerRight> : null;
}
