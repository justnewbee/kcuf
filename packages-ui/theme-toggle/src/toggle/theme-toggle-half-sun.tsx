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
    transition: transform var(--theme-toggle-duration, 500ms) ease;
  }
  
  &[data-toggled] path {
    transform: rotate(180deg);
  }
` as typeof SvgBase;

export default forwardRef(function HalfSun(props: IThemeToggleProps, ref: TThemeToggleRef): ReactElement {
  return <ScSvg ref={ref as never} {...props}>
    <path d="M27.5 11.5v-7h-7L16 0l-4.5 4.5h-7v7L0 16l4.5 4.5v7h7L16 32l4.5-4.5h7v-7L32 16l-4.5-4.5zM16 25.4V6.6c5.2 0 9.4 4.2 9.4 9.4s-4.2 9.4-9.4 9.4z" />
  </ScSvg>;
});
