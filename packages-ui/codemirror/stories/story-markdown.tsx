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

const CODE = `# Markdown

## Heading 1

* List 1 **strong** _em_
* List 2
* List 3

\`code\` is good`;

export default function StoryMarkdown(): ReactElement {
  const [stateCode, setStateCode] = useState<string>(CODE);
  
  return <Flex>
    <Codemirror {...{
      language: 'markdown',
      value: stateCode,
      onChange: setStateCode
    }} />
    <ScTextarea {...{
      value: stateCode,
      onChange: setStateCode
    }} />
  </Flex>;
}
