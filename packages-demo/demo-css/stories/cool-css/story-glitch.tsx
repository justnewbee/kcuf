import {
  ReactElement
} from 'react';
import styled, {
  keyframes
} from 'styled-components';

const kfGlitch = keyframes`
  0% {
    clip: rect(73px, 9999px, 4px, 0);
  }
  5% {
    clip: rect(85px, 9999px, 49px, 0);
  }
  10% {
    clip: rect(22px, 9999px, 15px, 0);
  }
  15% {
    clip: rect(47px, 9999px, 28px, 0);
  }
  20% {
    clip: rect(47px, 9999px, 22px, 0);
  }
  25% {
    clip: rect(10px, 9999px, 2px, 0);
  }
  30% {
    clip: rect(79px, 9999px, 46px, 0);
  }
  35% {
    clip: rect(78px, 9999px, 21px, 0);
  }
  40% {
    clip: rect(6px, 9999px, 46px, 0);
  }
  45% {
    clip: rect(28px, 9999px, 22px, 0);
  }
  50% {
    clip: rect(68px, 9999px, 42px, 0);
  }
  55% {
    clip: rect(26px, 9999px, 33px, 0);
  }
  60% {
    clip: rect(75px, 9999px, 75px, 0);
  }
  65% {
    clip: rect(90px, 9999px, 54px, 0);
  }
  70% {
    clip: rect(47px, 9999px, 48px, 0);
  }
  75% {
    clip: rect(80px, 9999px, 34px, 0);
  }
  80% {
    clip: rect(96px, 9999px, 20px, 0);
  }
  85% {
    clip: rect(74px, 9999px, 52px, 0);
  }
  90% {
    clip: rect(24px, 9999px, 76px, 0);
  }
  95% {
    clip: rect(64px, 9999px, 6px, 0);
  }
  100% {
    clip: rect(27px, 9999px, 68px, 0);
  }
`;
const kfGlitch2 = keyframes`
  0% {
    clip: rect(73px, 9999px, 4px, 0);
  }
  5% {
    clip: rect(85px, 9999px, 49px, 0);
  }
  10% {
    clip: rect(22px, 9999px, 15px, 0);
  }
  15% {
    clip: rect(47px, 9999px, 28px, 0);
  }
  20% {
    clip: rect(47px, 9999px, 22px, 0);
  }
  25% {
    clip: rect(10px, 9999px, 2px, 0);
  }
  30% {
    clip: rect(79px, 9999px, 46px, 0);
  }
  35% {
    clip: rect(78px, 9999px, 21px, 0);
  }
  40% {
    clip: rect(6px, 9999px, 46px, 0);
  }
  45% {
    clip: rect(28px, 9999px, 22px, 0);
  }
  50% {
    clip: rect(68px, 9999px, 42px, 0);
  }
  55% {
    clip: rect(26px, 9999px, 33px, 0);
  }
  60% {
    clip: rect(75px, 9999px, 75px, 0);
  }
  65% {
    clip: rect(90px, 9999px, 54px, 0);
  }
  70% {
    clip: rect(47px, 9999px, 48px, 0);
  }
  75% {
    clip: rect(80px, 9999px, 34px, 0);
  }
  80% {
    clip: rect(96px, 9999px, 20px, 0);
  }
  85% {
    clip: rect(74px, 9999px, 52px, 0);
  }
  90% {
    clip: rect(24px, 9999px, 76px, 0);
  }
  95% {
    clip: rect(64px, 9999px, 6px, 0);
  }
  100% {
    clip: rect(27px, 9999px, 68px, 0);
  }
`;

const ScGlitch = styled.div`
  position: relative;
  margin: 0 auto;
  width: 400px;
  color: white;
  font-size: 100px;
  
  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    overflow: hidden;
    background: black;
    clip: rect(0, 900px, 0, 0);
    color: white;
  }
  
  &::before {
    left: -2px;
    text-shadow: 1px 0 blue;
    animation: ${kfGlitch2} 3s infinite linear alternate-reverse;
  }
  
  &::after {
    left: 2px;
    text-shadow: -1px 0 red;
    animation: ${kfGlitch} 2s infinite linear alternate-reverse;
  }
`;

const ScStoryGlitch = styled.div`
  padding: 50px;
  background-color: #000;
`;

export default function StoryGlitch(): ReactElement {
  return <ScStoryGlitch>
    <ScGlitch data-text="GLITCH">GLITCH</ScGlitch></ScStoryGlitch>;
}
