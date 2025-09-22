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

const CODE = `body {
  color: #123;
}

main {
  margin-block: 16px;
}`;

export default function StoryCss(): ReactElement {
  const [stateCode, setStateCode] = useState<string>(CODE);
  
  return <Flex>
    <Codemirror {...{
      language: 'css',
      value: stateCode,
      onChange: setStateCode
    }} />
    <ScTextarea {...{
      value: stateCode,
      onChange: setStateCode
    }} />
  </Flex>;
}
