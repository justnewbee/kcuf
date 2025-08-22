import {
  ReactElement,
  forwardRef
} from 'react';
import styled from 'styled-components';

import {
  IThemeToggleProps,
  TThemeToggleRef
} from '../types';

interface IScProps {
  $duration: number;
  $withClick: boolean;
}

const ScSvg = styled.svg<IScProps>`
  --theme-toggle-duration: ${props => props.$duration}ms;
  
  width: 1em;
  height: 1em;
  cursor: ${props => props.$withClick ? 'pointer' : 'default'};
  fill: currentcolor;
  
  @media (prefers-reduced-motion: reduce) {
    &[data-reversed] {
      transform: scaleX(-1);
    }
    
    &:not([data-force-motion]) * {
      transition: none !important;
    }
  }
`;

export default forwardRef(function SvgBase({
  duration = 500,
  toggled,
  reversed,
  forceMotion,
  children,
  ...props
}: IThemeToggleProps, ref: TThemeToggleRef): ReactElement {
  return <ScSvg ref={ref} {...{
    xmlns: 'http://www.w3.org/2000/svg',
    width: '1em',
    height: '1em',
    fill: 'currentcolor',
    'aria-hidden': 'true',
    viewBox: '0 0 32 32',
    ...props,
    $duration: duration,
    $withClick: !!props.onClick, // SVG 不允许 aria-role
    'data-toggled': toggled ? '' : undefined,
    'data-reversed': reversed ? '' : undefined,
    'data-force-motion': forceMotion ? '' : undefined
  }}>{children}</ScSvg>;
});
