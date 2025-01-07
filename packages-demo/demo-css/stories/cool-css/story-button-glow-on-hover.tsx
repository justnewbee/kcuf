import {
  ReactElement
} from 'react';
import styled, {
  keyframes
} from 'styled-components';

const kfGlow = keyframes`
  0% {
    background-position: 0 0;
  }
  
  50% {
    background-position: 400% 0;
  }
  
  100% {
    background-position: 0 0;
  }
`;

const ScButtonGlowOnHover = styled.button`
  position: relative;
  z-index: 0;
  width: 220px;
  height: 50px;
  background: #111;
  border: none;
  border-radius: 10px;
  outline: none;
  color: #fff;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    z-index: -1;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    opacity: 0;
    background: linear-gradient(45deg, #f00, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #f00);
    background-size: 400%;
    border-radius: 10px;
    filter: blur(5px);
    transition: opacity .3s ease-in-out;
    animation: ${kfGlow} 20s linear infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: #111;
    border-radius: 10px;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

// 参考 https://codepen.io/kocsten/pen/rggjXp
export default function StoryButtonGlowOnHover(): ReactElement {
  return <ScButtonGlowOnHover>
    Hover
  </ScButtonGlowOnHover>;
}
