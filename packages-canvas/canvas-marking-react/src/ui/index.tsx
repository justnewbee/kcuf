import {
  ReactElement
} from 'react';
import styled, {
  css
} from 'styled-components';

import {
  useRefDomContainer,
  useRefDomMarkingStage
} from '../model';

// import Ops from './ops';

interface IScContainerProps {
  $fullscreen?: boolean;
}

const ScContainer = styled.div<IScContainerProps>`
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 960px;
  min-height: 320px;
  overflow: auto;
  border: 1px double hsl(203 98% 55%);
  resize: vertical;
  
  ${props => props.$fullscreen ? css`
    background-color: hsl(0 0% 100%);
    resize: none;
  ` : null}
`;
const ScMarking = styled.div`
  //width: 100%;
  //height: 100%;
  min-height: 300px;
`;

const ScShit = styled.div`
  min-height: 300px;
  background: red;
`;
const ScShit2 = styled.div`
  flex: 1;
  background: #00ff10;
`;
const ScShit3 = styled.div`
  height: 100%;
  background: #00f;
`;

export default function Ui(): ReactElement {
  const refDomMarkingStage = useRefDomMarkingStage();
  
  return <>
    <div style={{
      minHeight: 300,
      background: 'red',
      overflow: 'hidden',
      resize: 'vertical'
    }}>
      <div style={{
        height: '100%',
        background: 'yellow'
      }} />
    </div>
    <div style={{
      minHeight: 300,
      background: 'purple',
      position: 'relative',
      overflow: 'hidden',
      resize: 'vertical'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'green'
      }} />
    </div>
  </>;
  
  // return <ScMarking ref={refDomMarkingStage} />;
}
