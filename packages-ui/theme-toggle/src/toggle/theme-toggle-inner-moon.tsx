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
    transition: transform var(--theme-toggle-duration, 500ms) cubic-bezier(0, 0, 0.15, 1.25);
  }
  
  circle {
    transition: transform calc(var(--theme-toggle-duration, 500ms) / 1.5) cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &[data-toggled] {
    path {
      transform: rotate(180deg);
    }
    
    circle {
      transform: translate3d(15%, 0, 0);
    }
  }
` as typeof SvgBase;

export default forwardRef(function InnerMoon(props: IThemeToggleProps, ref: TThemeToggleRef): ReactElement {
  return <ScSvg ref={ref as never} {...props}>
    <path d="M27.5 11.5v-7h-7L16 0l-4.5 4.5h-7v7L0 16l4.5 4.5v7h7L16 32l4.5-4.5h7v-7L32 16l-4.5-4.5zM16 25.4a9.39 9.39 0 1 1 0-18.8 9.39 9.39 0 1 1 0 18.8z" />
    <circle cx="16" cy="16" r="8.1" />
  </ScSvg>;
});
