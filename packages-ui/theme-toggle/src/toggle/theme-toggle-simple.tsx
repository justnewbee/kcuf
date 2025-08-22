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
    transition-timing-function: cubic-bezier(0, 0, 0.15, 1.25);
    transition-duration: calc(var(--theme-toggle-duration, 500ms));
    transition-property: transform, d;
  }
  
  &[data-toggled] :first-child path {
    d: path('M-18-1h55v37h-55zm32 12a1 1 0 0025 0 1 1 0 00-25 0');
  }
  
  @supports not (d:path('')) {
    &[data-toggled] :first-child path {
      transform: translate3d(-19px, 5px, 0);
    }
  }
` as typeof SvgBase;

export default forwardRef(function Simple(props: IThemeToggleProps, ref: TThemeToggleRef): ReactElement {
  return <ScSvg ref={ref as never} {...props}>
    <clipPath id="theme-toggle-clip-path-simple">
      <path d="M0-5h55v37h-55zm32 12a1 1 0 0025 0 1 1 0 00-25 0" />
    </clipPath>
    <g clipPath="url(#theme-toggle-clip-path-simple)">
      <circle cx="16" cy="16" r="15" />
    </g>
  </ScSvg>;
});
