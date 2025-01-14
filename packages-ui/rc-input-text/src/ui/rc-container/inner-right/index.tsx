import {
  ReactElement
} from 'react';

import {
  useProps,
  useFocused
} from '@kcuf-ui/rc-input-text-headless';

import {
  ScInputInnerRight
} from '../../sc';

export default function InnerRight(): ReactElement | null {
  const {
    innerRight
  } = useProps();
  const focused = useFocused();
  
  return innerRight ? <ScInputInnerRight $focused={focused}>{innerRight}</ScInputInnerRight> : null;
}
