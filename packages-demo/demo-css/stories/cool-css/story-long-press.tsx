import {
  ReactElement
} from 'react';
import styled, {
  keyframes
} from 'styled-components';

import {
  Button
} from '@kcuf/demo-rc';

const kfCount = keyframes`
  to {
    --t: 999;
  }
`;

const ScButton = styled(Button)`
  @property --t {
    syntax: '<integer>';
    inherits: false;
    initial-value: 0;
  }
  
  @counter-style 太棒了 {
    system: cyclic;
    symbols: '太棒了！！！';
  }
  
  @counter-style 加油 {
    system: cyclic;
    symbols: '加油！！';
    range: 0 50;
    fallback: 太棒了
  }
  
  @counter-style 鼓励 {
    system: cyclic;
    symbols: '鼓励！';
    range: 0 20;
    fallback: 加油
  }
  
  position: relative;
  margin-top: 200px;
  
  &::after {
    content: counter(time) counter(time, 鼓励);
    position: absolute;
    bottom: 100%;
    width: max-content;
    visibility: hidden;
    opacity: 0;
    background-image: linear-gradient(#FFCF02, #FF7352);
    background-clip: text;
    font-size: 1.5rem;
    font-weight: bolder;
    font-style: italic;
    counter-reset: time var(--t);
    transform: translateY(100%);
    transition: transform 0s 0.6s;
    animation: ${kfCount} 100s steps(999) forwards;
    animation-play-state: paused;
    -webkit-text-fill-color: transparent;
  }
  
  &:active::after {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
    transition: .3s;
    animation-play-state: running;
  }
`;

export default function StoryLongPress(): ReactElement {
  return <ScButton>长按点赞</ScButton>;
}
