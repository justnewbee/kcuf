import {
  ReactElement
} from 'react';

import {
  useRefInput,
  usePropsForInputElement
} from '@kcuf/rc-headless-input-text';

import {
  ScInputWrapper,
  ScInputReal
} from '../../sc';

export default function TheInput(): ReactElement {
  const propsForInputElement = usePropsForInputElement();
  const refInput = useRefInput();
  
  return <ScInputWrapper>
    <ScInputReal ref={refInput} {...propsForInputElement} />
  </ScInputWrapper>;
}
