import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  KeyboardCode,
  KeyData,
  useKeyDetails
} from '@kcuf-ui/rc-keyboard-mac-headless';

import {
  getKeyboardKeyDisplayName
} from '../../util';

const ScKeyDetails = styled.div`
  font-size: 11px;
  color: hsl(200 100% 50%);
  text-align: center;
  
  span {
    margin-left: 1em;
    opacity: 0.5;
    
    &:first-child {
      margin-left: 0;
    }
  }
`;

interface IProps {
  data: KeyData;
}

export default function KeyboardKeyName({
  data
}: IProps): ReactElement {
  const keyDetails = useKeyDetails();
  
  if (keyDetails && data.code === KeyboardCode.SPACE) {
    return <ScKeyDetails>
      <div>
        {keyDetails.control ? <>⌃</> : null}
        {keyDetails.alt ? <>⌥</> : null}
        {keyDetails.shift ? <>⇧</> : null}
        {keyDetails.meta ? <>⌘</> : null}
      </div>
      <span>key</span>
      {' '}
      <>{keyDetails.key === ' ' ? '␣' : keyDetails.key}</>
      <span>code</span>
      {' '}
      <>{keyDetails.code}</>
      {keyDetails.keyCode ? <>
        <span>keyCode</span>
        {' '}
        <>{keyDetails.keyCode}</></> : null}
    </ScKeyDetails>;
  }
  
  const name = getKeyboardKeyDisplayName(data);
  
  return <>{Array.isArray(name) ? name.map(vv => <div key={`${vv}`}>{vv}</div>) : name}</>;
}
