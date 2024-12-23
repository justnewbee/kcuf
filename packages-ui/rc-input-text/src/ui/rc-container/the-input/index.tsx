import {
  ReactElement
} from 'react';

import {
  useRefInput,
  usePropsForInputElement
} from '@kcuf-ui/rc-input-text-headless';

import {
  ScInputWrapper,
  ScInputReal
} from '../../sc';

export default function TheInput(): ReactElement {
  const refInput = useRefInput();
  const propsForInputElement = usePropsForInputElement();
  
  return <ScInputWrapper>
    <ScInputReal ref={refInput} {...propsForInputElement} />
  </ScInputWrapper>;
}
