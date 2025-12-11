import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  IThemeToggleProps
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

export default function ThemeToggleDarkSide(props: IThemeToggleProps): ReactElement {
  return <ScSvg {...props}>
    <path d="M16 .5C7.4.5.5 7.4.5 16S7.4 31.5 16 31.5 31.5 24.6 31.5 16 24.6.5 16 .5zm0 28.1V3.4C23 3.4 28.6 9 28.6 16S23 28.6 16 28.6z" />
  </ScSvg>;
}
