import {
  ReactElement
} from 'react';
import styled, {
  keyframes
} from 'styled-components';

const kfRunningBorder = keyframes`
  0% {
    transform: rotate(0) scale(10);
  }
  
  100% {
    transform: rotate(-360deg) scale(10);
  }
`;

const ScRunningBorder = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  z-index: 10;
  padding: 2px;
  width: auto;
  overflow: hidden;
  border-radius: 8px;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-image: conic-gradient(hsl(217 91% 60%) 20deg, transparent 120deg);
    border-radius: 9999px;
    animation-name: ${kfRunningBorder};
    animation-duration: 10s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
`;

const ScButton = styled.button`
  position: relative;
  z-index: 20;
  padding: 1rem;
  background-color: hsl(240 10% 4%);
  border: 0;
  border-radius: 8px;
  color: hsl(0 0% 100%);
`;

// 参考自 https://franken-ui.dev/
export default function StoryRunningBorder(): ReactElement {
  return <ScRunningBorder>
    <ScButton>I am a Button with a Running Border</ScButton>
  </ScRunningBorder>;
}
