import {
  ReactElement
} from 'react';
import styled, {
  RuleSet,
  css,
  keyframes
} from 'styled-components';

import {
  IIconBaseProps
} from '../types';

interface IScIconProps {
  $rotate?: number;
  $rotating?: boolean;
}

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

function getCssRotation(props: IScIconProps): RuleSet | undefined {
  if (props.$rotating) {
    return css`
      animation: ${kfIconRotating} 1s linear infinite;
    `;
  }
  
  if (typeof props.$rotate === 'number' && props.$rotate > 0) {
    return css`
      transform: rotate(${props.$rotate}deg);
    `;
  }
}

const ScIcon = styled.i<IScIconProps>`
  &::before {
    display: inline-block;
    line-height: 1;
    font-size: inherit;
    font-weight: 200;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    vertical-align: baseline;
    text-rendering: auto;
    transition: all linear 200ms;
    -webkit-text-stroke-width: 0.2px;
    
    ${props => getCssRotation(props)}
  }
`;

/**
 * ConsoleBase 项目自用的图标组件
 */
export default function IconBase({
  rotate,
  rotating,
  ...props
}: IIconBaseProps): ReactElement {
  return <ScIcon {...{
    $rotate: rotate,
    $rotating: rotating,
    ...props
  }} />;
}
