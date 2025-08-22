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
  * {
    transform-origin: center;
    transition: transform calc(var(--theme-toggle-duration, 500ms) * 0.6) ease;
  }
  
  > :first-child path {
    transition-property: transform, d;
  }
  
  > g g {
    circle {
      transition-duration: calc(var(--theme-toggle-duration, 500ms) * 0.2);
    }
    
    :nth-child(1) {
      transition-delay: calc(var(--theme-toggle-duration, 500ms) * 0.253);
    }
    
    :nth-child(2) {
      transition-delay: calc(var(--theme-toggle-duration, 500ms) * 0.348);
    }
    
    :nth-child(3) {
      transition-delay: calc(var(--theme-toggle-duration, 500ms) * 0.443);
    }
    
    :nth-child(4) {
      transition-delay: calc(var(--theme-toggle-duration, 500ms) * 0.538);
    }
    
    :nth-child(5) {
      transition-delay: calc(var(--theme-toggle-duration, 500ms) * 0.633);
    }
    
    :nth-child(6) {
      transition-delay: calc(var(--theme-toggle-duration, 500ms) * 0.728);
    }
  }
  
  &[data-toggled] {
    * {
      transition-delay: 0s;
      transition-duration: var(--theme-toggle-duration, 500ms);
    }
    
    > g > circle {
      transform: scale(1.4);
    }
    
    > g g circle {
      transform: scale(0);
      transition-duration: calc(var(--theme-toggle-duration, 500ms) * 0.4);
    }
    
    > :first-child {
      transform: rotate(-90deg);
    }
    
    > :first-child path {
      d: path('M-12-14h42v30a1 1 0 00-16 13H0Z');
    }
  }
  
  @supports not (d:path('')) {
    &[data-toggled]:first-child path {
      transform: translate3d(-12px, -14px, 0);
    }
  }
` as typeof SvgBase;

export default forwardRef(function Around(props: IThemeToggleProps, ref: TThemeToggleRef): ReactElement {
  return <ScSvg ref={ref as never} {...props}>
    <clipPath id="theme-toggle-clip-path-around">
      <path d="M0 0h42v30a1 1 0 00-16 13H0Z" />
    </clipPath>
    <g clipPath="url(#theme-toggle-clip-path-around)">
      <circle cx="16" cy="16" r="8.4" />
      <g>
        <circle cx="16" cy="3.3" r="2.3" />
        <circle cx="27" cy="9.7" r="2.3" />
        <circle cx="27" cy="22.3" r="2.3" />
        <circle cx="16" cy="28.7" r="2.3" />
        <circle cx="5" cy="22.3" r="2.3" />
        <circle cx="5" cy="9.7" r="2.3" />
      </g>
    </g>
  </ScSvg>;
});
