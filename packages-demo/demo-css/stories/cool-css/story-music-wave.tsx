import {
  ReactElement
} from 'react';
import styled, {
  keyframes
} from 'styled-components';

const W = 6;
const H_UNIT = 8;

const kfMusicWave = keyframes`
  100% {
    height: ${H_UNIT}px;
    filter: contrast(2);
  }
`;

const ScMusicWave = styled.div`
  display: flex;
  align-items: end;
  height: ${H_UNIT * 5}px;
  
  > span {
    margin-right: ${W}px;
    width: ${W}px;
    background-color: #999;
    border-radius: 4px;
    
    &:last-child {
      margin-right: 0;
    }
    
    &:nth-child(1) {
      height: ${H_UNIT * 4}px;
      animation: ${kfMusicWave} 1s ease-in-out alternate-reverse infinite;
    }
    
    &:nth-child(2) {
      height: ${H_UNIT * 3}px;
      animation: ${kfMusicWave} 0.8s ease-in-out alternate-reverse infinite;
    }
    
    &:nth-child(3) {
      height: ${H_UNIT * 5}px;
      animation: ${kfMusicWave} 0.5s ease-in-out alternate-reverse infinite;
    }
    
    &:nth-child(4) {
      height: ${H_UNIT * 3}px;
      animation: ${kfMusicWave} 0.4s ease-in-out alternate-reverse infinite;
    }
    
    &:nth-child(5) {
      height: ${H_UNIT * 4}px;
      animation: ${kfMusicWave} 0.7s ease-in-out alternate-reverse infinite;
    }
  }
`;

export default function StoryMusicWave(): ReactElement {
  return <ScMusicWave>
    <span />
    <span />
    <span />
    <span />
    <span />
  </ScMusicWave>;
}
