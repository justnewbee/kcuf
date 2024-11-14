import {
  RuleSet,
  css,
  keyframes
} from 'styled-components';

import {
  IScIconBaseProps
} from '../types';

const kfIconRotating = keyframes`
  0% {
    transform: rotate(0deg);
    transform-origin: 50% 50%;
  }
  
  100% {
    transform: rotate(1turn);
    transform-origin: 50% 50%;
  }
`;

export default function getCssIconRotation(props: IScIconBaseProps): RuleSet | undefined {
  if (props.$rotating) {
    return css`
      animation: ${kfIconRotating} 1s linear infinite;
    `;
  }
  
  if (props.$rotate) {
    return css`
      transform: rotate(${props.$rotate}deg);
    `;
  }
}
