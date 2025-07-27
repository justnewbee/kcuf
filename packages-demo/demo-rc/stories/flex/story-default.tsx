import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  H1,
  Flex
} from '../../src';

const ScItemBase = styled.div`
  padding: 12px;
  height: 200px;
`;
const ScRed = styled(ScItemBase)`
  background-color: hsl(0 100% 50%);
  color: hsl(0 0% 100%);
`;
const ScBlue = styled(ScItemBase)`
  background-color: hsl(240 100% 50%);
  color: hsl(0 0% 100%);
`;

export default function StoryDefault(): ReactElement {
  return <>
    <H1>Flex</H1>
    <Flex ratio={[2, 1]}>
      <ScRed>Red</ScRed>
      <ScBlue>Blue</ScBlue>
    </Flex>
  </>;
}
