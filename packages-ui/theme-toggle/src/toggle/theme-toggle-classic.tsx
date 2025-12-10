import {
  ReactElement,
  forwardRef
} from 'react';
import styled from 'styled-components';

import {
  IThemeToggleProps,
  TThemeToggleRef
} from '../types';

import SvgBase from './svg-base';

const ScSvg = styled(SvgBase)`
  path {
    transform-origin: center;
    transition-timing-function: cubic-bezier(0, 0, 0.15, 1.25);
    transition-duration: calc(var(--theme-toggle-duration, 500ms) * 0.8);
  }
  
  g path {
    transition-delay: calc(var(--theme-toggle-duration, 500ms) * 0.2);
    transition-property: opacity, transform;
  }
  
  :first-child path {
    transition-property: transform, d;
  }
  
  &[data-toggled] {
    g path {
      opacity: 0;
      transform: scale(0.5) rotate(45deg);
      transition-delay: 0s;
    }
    
    :first-child path {
      d: path('M-12 5h30a1 1 0 0 0 9 13v24h-39Z');
      transition-delay: calc(var(--theme-toggle-duration, 500ms) * 0.2);
    }
  }
  
  @supports not (d:path('')) {
    &[data-toggled] :first-child path {
      transform: translate3d(-12px, 10px, 0);
    }
  }
` as typeof SvgBase;

export default forwardRef(function Classic(props: IThemeToggleProps, ref: TThemeToggleRef): ReactElement {
  return <ScSvg ref={ref as never} {...props}>
    <clipPath id="theme-toggle-clip-path-classic">
      <path d="M0-5h30a1 1 0 0 0 9 13v24H0Z" />
    </clipPath>
    <g clipPath="url(#theme-toggle-clip-path-classic)">
      <circle cx="16" cy="16" r="9.34" />
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M16 5.5v-4" />
        <path d="M16 30.5v-4" />
        <path d="M1.5 16h4" />
        <path d="M26.5 16h4" />
        <path d="m23.4 8.6 2.8-2.8" />
        <path d="m5.7 26.3 2.9-2.9" />
        <path d="m5.8 5.8 2.8 2.8" />
        <path d="m23.4 23.4 2.9 2.9" />
      </g>
    </g>
  </ScSvg>;
});
