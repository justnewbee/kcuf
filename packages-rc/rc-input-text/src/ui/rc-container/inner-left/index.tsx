import {
  ReactElement
} from 'react';

import {
  useProps,
  useFocused
} from '@kcuf/rc-input-text-headless';

import {
  ScInputInnerLeft
} from '../../sc';

export default function InnerLeft(): ReactElement | null {
  const {
    innerLeft
  } = useProps();
  const focused = useFocused();
  
  return innerLeft ? <ScInputInnerLeft focused={focused}>{innerLeft}</ScInputInnerLeft> : null;
}
