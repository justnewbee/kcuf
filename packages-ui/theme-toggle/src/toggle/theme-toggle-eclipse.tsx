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
  :first-child path {
    transition-timing-function: ease;
    transition-duration: calc(var(--theme-toggle-duration, 500ms));
    transition-property: transform, d;
  }
  
  &[data-toggled] :first-child path {
    d: path('M-32 0h64v32h-64zm36 16a1 1 0 0024 1 1 1 0 00-24-1');
  }
  
  @supports not (d:path('')) {
    &[data-toggled] :first-child path {
      transform: translate3d(-32px, 0, 0);
    }
  }
` as typeof SvgBase;

export default forwardRef(function Eclipse(props: IThemeToggleProps, ref: TThemeToggleRef): ReactElement {
  return <ScSvg ref={ref as never} {...props}>
    <clipPath id="theme-toggle-clip-path-eclipse">
      <path d="M0 0h64v32h-64zm36 16a1 1 0 0024 1 1 1 0 00-24-1" />
    </clipPath>
    <g clipPath="url(#theme-toggle-clip-path-eclipse)">
      <circle cx="16" cy="16" r="16" />
    </g>
  </ScSvg>;
});
