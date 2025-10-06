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

const CODE = `# Define a list of fruits
fruits = ["apple", "banana", "cherry"]
# Use a for loop to print each fruit
for fruit in fruits:
   print(fruit)`;

export default function StoryPython(): ReactElement {
  const [stateCode, setStateCode] = useState<string>(CODE);
  
  return <Flex>
    <Codemirror {...{
      language: 'python',
      value: stateCode,
      onChange: setStateCode
    }} />
    <ScTextarea {...{
      value: stateCode,
      onChange: setStateCode
    }} />
  </Flex>;
}
