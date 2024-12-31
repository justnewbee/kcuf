import {
  ReactElement
} from 'react';
import styled, {
  keyframes
} from 'styled-components';

const kfRipple = keyframes`
  0% {
    box-shadow:
        0 0 0 1px rgb(255 37 37 / 0);
  }
  
  10% {
    box-shadow:
        0 0 0 2px rgb(255 37 37 / 10%);
  }
  
  20% {
    box-shadow:
        0 0 0 4px rgb(255 37 37 / 20%);
  }
  
  40% {
    box-shadow:
        0 0 0 1px rgb(255 37 37 / 10%),
        0 0 0 6px rgb(255 37 37 / 30%);
  }
  
  50% {
    box-shadow:
        0 0 0 3px rgb(255 37 37 / 20%),
        0 0 0 8px rgb(255 37 37 / 40%);
  }
  
  60% {
    box-shadow:
        0 0 0 5px rgb(255 37 37 / 30%),
        0 0 0 10px rgb(255 37 37 / 50%);
  }
  
  70% {
    box-shadow:
        0 0 0 6px rgb(255 37 37 / 40%),
        0 0 0 11px rgb(255 37 37 / 40%);
  }
  
  80% {
    box-shadow:
        0 0 0 7px rgb(255 37 37 / 30%),
        0 0 0 12px rgb(255 37 37 / 30%);
  }
  
  90% {
    box-shadow:
        0 0 0 6px rgb(255 37 37 / 20%),
        0 0 0 13px rgb(255 37 37 / 20%);
  }
  
  100% {
    box-shadow:
        0 0 0 7px rgb(255 37 37 / 10%);
  }
`;

const ScRippleButton = styled.button`
  display: inline-block;
  width: 60px;
  height: 60px;
  background: #fff;
  border: 0;
  border-radius: 100%;
  color: #f99;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  line-height: 60px;
  animation: ${kfRipple} 2s infinite;
`;

export default function StoryRipple(): ReactElement {
  return <ScRippleButton>❦</ScRippleButton>;
}
