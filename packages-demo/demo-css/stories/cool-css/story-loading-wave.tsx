import {
  ReactElement
} from 'react';
import styled, {
  keyframes
} from 'styled-components';

const kfLoadingBar = keyframes`
  0% {
    margin-top: 25%;
    height: 10%;
  }
  
  50% {
    height: 100%;
    margin-top: 0;
  }
  
  100% {
    height: 10%;
    margin-top: 25%;
  }
`;

const ScLoadingWave = styled.div`
  display: flex;
  margin: 100px auto 0;
  width: 200px;
  height: 120px;
  
  > span {
    margin-right: 20px;
    width: 10px;
    height: 0;
    border-radius: 18px;
    
    &:nth-child(1) {
      background-color: #f677b0;
      animation: ${kfLoadingBar} 2s 0.2s infinite linear;
    }
    
    &:nth-child(2) {
      background-color: #df7ff2;
      animation: ${kfLoadingBar} 2s 0.4s infinite linear;
    }
    
    &:nth-child(3) {
      background-color: #8c7ff2;
      animation: ${kfLoadingBar} 2s 0.6s infinite linear;
    }
    
    &:nth-child(4) {
      background-color: #7fd0f2;
      animation: ${kfLoadingBar} 2s 0.8s infinite linear;
    }
    
    &:nth-child(5) {
      background-color: #7ff2d3;
      animation: ${kfLoadingBar} 2s 1.0s infinite linear;
    }
  }
`;

export default function StoryLoadingWave(): ReactElement {
  return <ScLoadingWave>
    <span />
    <span />
    <span />
    <span />
    <span />
  </ScLoadingWave>;
}
