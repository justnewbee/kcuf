import {
  ReactElement,
  useState
} from 'react';
import styled from 'styled-components';

import {
  InputTextarea,
  Flex
} from '@kcuf/demo-rc';

import Codemirror from '../src';

const ScTextarea = styled(InputTextarea)`
  height: 100%;
  resize: none;
`;

const CODE = JSON.stringify({
  string: 'hello world',
  number: 123456789,
  boolean: true,
  array: [1, 2, '3']
}, null, 2);

export default function StoryJson(): ReactElement {
  const [stateCode, setStateCode] = useState<string>(CODE);
  
  return <Flex>
    <Codemirror {...{
      language: 'json',
      value: stateCode,
      onChange: setStateCode
    }} />
    <ScTextarea {...{
      value: stateCode,
      onChange: setStateCode
    }} />
  </Flex>;
}
