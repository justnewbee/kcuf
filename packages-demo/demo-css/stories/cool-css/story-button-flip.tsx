import {
  ReactElement
} from 'react';
import styled from 'styled-components';

const ScButtonFlip = styled.span`
  display: inline-block;
  position: relative;
  outline: 0;
  text-align: center;
  text-transform: uppercase;
  line-height: 40px;
  letter-spacing: 1px;
  
  &::before,
  &::after {
    display: block;
    top: 0;
    left: 0;
    transition: 500ms;
  }
  
  &::before {
    content: attr(data-flip-normal);
    position: relative;
    padding: 0 30px;
    opacity: 1;
    background: #323237;
    color: #adadaf;
    transform: translateY(0) rotateX(0);
  }
  
  &::after {
    content: attr(data-flip-flipped);
    position: absolute;
    width: 100%;
    opacity: 0;
    background: #adadaf;
    color: #323237;
    transform: translateY(-50%) rotateX(90deg);
  }
  
  &:hover {
    &::after {
      opacity: 1;
      transform: translateY(0) rotateX(0);
    }
    
    &::before {
      opacity: 0;
      transform: translateY(50%) rotateX(90deg);
    }
  }
`;

// 参考 https://codepen.io/MoorLex/pen/NBwNZa
export default function StoryButtonFlip(): ReactElement {
  return <ScButtonFlip data-flip-normal="Normal" data-flip-flipped="Flipped" />;
}
