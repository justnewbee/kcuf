import {
  ReactElement
} from 'react';
import styled, {
  css
} from 'styled-components';

import {
  IThemeToggleProps
} from '../types';

interface IScProps {
  $duration: number;
}

const ScSvg = styled.svg<IScProps>`
  --theme-toggle-duration: ${props => props.$duration}ms;
  
  width: 1em;
  height: 1em;
  fill: currentcolor;
  ${props => props.onClick ? css`
    cursor: pointer;
  ` : null}
`;

export default function SvgBase({
  duration = 500,
  toggled,
  reversed,
  forceMotion,
  children,
  ...props
}: IThemeToggleProps): ReactElement {
  return <ScSvg {...{
    xmlns: 'http://www.w3.org/2000/svg',
    width: '1em',
    height: '1em',
    fill: 'currentcolor',
    'aria-hidden': 'true',
    viewBox: '0 0 32 32',
    ...props,
    $duration: duration,
    'data-toggled': toggled ? '' : undefined,
    'data-reversed': reversed ? '' : undefined,
    'data-force-motion': forceMotion ? '' : undefined
  }}>{children}</ScSvg>;
}
