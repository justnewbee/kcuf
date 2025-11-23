import styled, {
  keyframes,
  css
} from 'styled-components';

import {
  IScIconBaseProps
} from '../types';
import {
  getCssIconRotation
} from '../util';

const kfEyeCatching = keyframes`
  0% {
    transform: scale(1);
  }
  
  14% {
    transform: scale(1.5);
  }
  
  28% {
    transform: scale(1);
  }
  
  42% {
    transform: scale(1.5);
  }
  
  70% {
    transform: scale(1);
  }
`;

export const ScIcon = styled.i<IScIconBaseProps>`
  font-family: ${props => props.$fontFamily} !important;
  line-height: 1.1;
  ${props => props.$color ? css`color: ${props.$color} !important;` : null}
  ${props => props.onClick ? css`cursor: pointer;` : null}
  ${props => props.$darkThemePrefix && props.$colorDark ? css`
    ${props.$darkThemePrefix} & {
      color: ${props.$colorDark} !important;
    }
  ` : null}
  
  &::before {
    content: '${props => props.$code}';
    display: inline-block;
    font-size: inherit;
    font-weight: 200;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: auto;
    vertical-align: middle;
    -webkit-text-stroke-width: 0.2px; /* stylelint-disable-line */
    transition: all linear 200ms;
    ${props => getCssIconRotation(props)}
  }
  
  &[aria-disabled='true'] {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  &[data-size='xs'] {
    font-size: 12px !important;
  }
  
  &[data-size='xs-relative'] {
    font-size: 0.9em !important;
  }
  
  &[data-size='s'] {
    font-size: 14px !important;
  }
  
  &[data-size='s-relative'] {
    font-size: 1.2em !important;
  }
  
  &[data-size='m'] {
    font-size: 16px !important;
  }
  
  &[data-size='m-relative'] {
    font-size: 1.4em !important;
  }
  
  &[data-size='l'] {
    font-size: 24px !important;
  }
  
  &[data-size='l-relative'] {
    font-size: 2em !important;
  }
  
  &[data-size='xl'] {
    font-size: 32px !important;
  }
  
  &[data-size='xl-relative'] {
    font-size: 3.2em !important;
  }
  
  &[data-spacing='start'] {
    margin-inline-start: 0.4em;
  }
  
  &[data-spacing='end'] {
    margin-inline-end: 0.4em;
  }
  
  &[data-spacing='start-end'] {
    margin-inline: 0.4em;
  }
  
  &[data-eye-catching] {
    &::before {
      animation: ${kfEyeCatching} 1.5s ease-in-out;
    }
  }
`;
