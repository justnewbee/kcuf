import {
  ReactElement
} from 'react';
import styled, {
  keyframes
} from 'styled-components';

interface IScProps {
  length: number;
}

const kfTyping = keyframes`
  0% {
    width: 0;
  }
`;

const kfCursorBlink = keyframes`
  50% {
    border-color: #fff;
  }
`;

const ScTypeWriter = styled.div<IScProps>`
  margin: 100px auto 0;
  width: ${props => props.length}em;
  overflow: hidden;
  border-right: 2px solid #222;
  color: blue;
  font-size: 60px;
  white-space: nowrap;
  animation: ${kfTyping} 4s steps(${props => props.length}) infinite, ${kfCursorBlink} 0.5s steps(1) infinite;
`;

const words = '一个个蹦出的打字效果';

export default function StoryLoadingWave(): ReactElement {
  return <ScTypeWriter length={words.length + 1}>{words}</ScTypeWriter>;
}
