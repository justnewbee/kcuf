import {
  ReactElement,
  useState
} from 'react';
import styled from 'styled-components';

import {
  InputSwitch,
  InputTextarea,
  Flex,
  Codemirror
} from '../../src';

const ScTextarea = styled(InputTextarea)`
  height: 100%;
  resize: none;
`;

const CODE = `import {
  EditorView,
  basicSetup
} from 'codemirror';
import {
  EditorState,
  Compartment
} from '@codemirror/state';
import {
  python
} from '@codemirror/lang-python';

const language = new Compartment;
const tabSize = new Compartment;

const state = EditorState.create({
  extensions: [
    basicSetup,
    language.of(python()),
    tabSize.of(EditorState.tabSize.of(8))
  ]
});

const view = new EditorView({
  state,
  parent: document.body
});

function setTabSize(size: number): void {
  view.dispatch({
    effects: tabSize.reconfigure(EditorState.tabSize.of(size))
  });
}`;

export default function StoryDefault(): ReactElement {
  const [stateCode, setStateCode] = useState<string>(CODE);
  const [stateReadOnly, setStateReadOnly] = useState(false);
  
  return <>
    <InputSwitch {...{
      label: 'readonly',
      value: stateReadOnly,
      onChange: setStateReadOnly
    }} />
    <Flex>
      <Codemirror {...{
        readOnly: stateReadOnly,
        language: 'tsx',
        value: stateCode,
        onChange: setStateCode
      }} />
      <ScTextarea {...{
        value: stateCode,
        onChange: setStateCode
      }} />
    </Flex>
    </>;
}
