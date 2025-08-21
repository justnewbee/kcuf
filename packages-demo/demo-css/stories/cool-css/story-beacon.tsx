import {
  ReactElement
} from 'react';
import styled, {
  keyframes
} from 'styled-components';

const kfInner = keyframes`
  20% {
    opacity: 0.9;
  }
  
  90% {
    opacity: 0.7;
  }
`;
const kfOuter = keyframes`
  0% {
    transform: scale(1);
  }
  
  45% {
    opacity: 0.7;
    transform: scale(0.75);
  }
  
  100% {
    opacity: 0.9;
    transform: scale(1);
  }
`;

const ScBeacon = styled.button`
  display: inline-block;
  position: relative;
  z-index: 100;
  padding: 8px;
  width: 36px;
  height: 36px;
  appearance: none;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  color: hsl(0 0% 33%);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
`;
const ScBeaconInner = styled.span`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 50%;
  opacity: 0.7;
  background-color: rgb(78 64 229);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: 1.2s ease-in-out infinite ${kfInner};
`;
const ScBeaconOuter = styled.span`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  background-color: rgb(78 64 229 / 20%);
  border: 2px solid rgb(78 64 229);
  border-radius: 50%;
  box-sizing: border-box;
  transform-origin: center center 0;
  animation: 1.2s ease-in-out infinite ${kfOuter};
`;

export default function StoryBeacon(): ReactElement {
  return <ScBeacon type="button" aria-label="Open the dialog" title="Open the dialog">
    <ScBeaconInner />
    <ScBeaconOuter />
  </ScBeacon>;
}
