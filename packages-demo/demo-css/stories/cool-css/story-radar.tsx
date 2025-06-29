import {
  ReactElement
} from 'react';
import styled, {
  keyframes
} from 'styled-components';

const kfRadar = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.95;
  }
  
  25% {
    transform: scale(2);
    opacity: 0.75;
  }
  
  50% {
    transform: scale(3);
    opacity: 0.5;
  }
  
  75% {
    transform: scale(4);
    opacity: 0.25;
  }
  
  100% {
    transform: scale(5);
    opacity: 0.05;
  }
`;

const ScRadar = styled.div`
  position: relative;
  margin: 20px auto;
  width: 300px;
  height: 100px;
  
  > div {
    position: absolute;
    top: 50px;
    left: 15px;
    width: 10px;
    height: 10px;
    background: rgb(255 001 002 / 75%);
    border: 1px solid rgb(255 001 002 / 85%);
    border-radius: 999px;
  }
  
  .circle1,
  .circle2,
  .circle3  {
    animation-name: ${kfRadar};
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  
  .circle1 {
    animation-delay: 0s;
  }
  
  .circle2 {
    animation-delay: 1s;
  }
  
  .circle3 {
    animation-delay: 2s;
  }
`;

export default function StoryRadar(): ReactElement {
  return <ScRadar>
    <div className="circle" />
    <div className="circle1" />
    <div className="circle2" />
    <div className="circle3" /></ScRadar>;
}
