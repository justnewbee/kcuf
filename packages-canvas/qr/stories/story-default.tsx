import {
  ReactElement,
  useState
} from 'react';
import styled from 'styled-components';

import {
  InputText,
  InputNumber,
  InputSwitch
} from '@kcuf/demo-rc';

const DEFAULT_URL = 'http://www.example.com';

export default function StoryDefault(): ReactElement {
  const [stateUrl, setStateUrl] = useState('');
  
  return <>
    <InputText {...{
      placeholder: DEFAULT_URL,
      value: stateUrl,
      onChange: setStateUrl
    }} />
  </>;
}
