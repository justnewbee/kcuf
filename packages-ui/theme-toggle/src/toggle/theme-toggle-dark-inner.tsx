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
  
  &[data-toggled] {
    :first-child {
      transform: rotate(180deg);
    }
    
    :last-child {
      transform: rotate(-180deg);
    }
  }
` as typeof SvgBase;

export default forwardRef(function DarkInner(props: IThemeToggleProps, ref: TThemeToggleRef): ReactElement {
  return <ScSvg ref={ref as never} {...props}>
    <path d="M16 9c3.9 0 7 3.1 7 7s-3.1 7-7 7" />
    <path d="M16 .5C7.4.5.5 7.4.5 16S7.4 31.5 16 31.5 31.5 24.6 31.5 16 24.6.5 16 .5zm0 28.1V23c-3.9 0-7-3.1-7-7s3.1-7 7-7V3.4C23 3.4 28.6 9 28.6 16S23 28.6 16 28.6z" />
  </ScSvg>;
});
