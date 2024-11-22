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
  
  const {
    $rotate,
    $scale = 0
  } = props;
  
  if ($rotate) { // translateZ 可能可以抵消旋转后产生的模糊（尤其是在非 4k 屏幕下）
    return $scale > 0 ? css`
      transform: rotate(${$rotate}deg) scale(${$scale}) translateZ(0) translateZ(0);
    ` : css`
      transform: rotate(${$rotate}deg) translateZ(0);
    `;
  }
}
