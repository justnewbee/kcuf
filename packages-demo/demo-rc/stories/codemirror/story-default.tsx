import {
  ReactElement,
  useState
} from 'react';
import styled from 'styled-components';

import {
  InputSwitch,
  InputTextarea,
  Codemirror
} from '../../src';

const ScTwoPane = styled.div`
  display: flex;
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
    <ScTwoPane>
      <Codemirror {...{
        readOnly: stateReadOnly,
        value: stateCode,
        onChange: setStateCode
      }} />
      <InputTextarea {...{
        value: stateCode,
        onChange: setStateCode
      }} />
    </ScTwoPane>
  </>;
}