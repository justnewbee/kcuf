import {
  RuleSet,
  css
} from 'styled-components';

import {
  mixinInputBg,
  // mixinInputBgHover,
  mixinInputBgFocus,
  mixinInputBgDisabled,
  mixinInputBorder,
  mixinInputBorderFocus,
  mixinInputBorderDisabled
} from '@kcuf/fork-console-base-theme';

import {
  IScInputProps
} from '../types';

const cssNormal = css<IScInputProps>`
  ${mixinInputBg}
  ${props => props.$borderless ? null : mixinInputBorder}
`;

// const cssHover = css<IScInputProps>`
//   ${mixinInputBgHover}
//   ${props => (props.borderless ? null : mixinInputBorderHover)}
// `;

const cssFocus = css<IScInputProps>`
  ${mixinInputBgFocus}
  ${props => {
    if (props.$borderless) {
      return null;
    }
    
    return mixinInputBorderFocus;
  }}
`;

const cssDisabled = css<IScInputProps>`
  ${mixinInputBgDisabled}
  ${props => props.$borderless ? null : mixinInputBorderDisabled}
`;

export default function getStyledBorder(props: IScInputProps): RuleSet<IScInputProps> {
  if (props.disabled) {
    return cssDisabled;
  }
  
  if (props.$focused && !props.$weakFocusStyle) {
    return cssFocus;
  }
  
  // if (props.hovered) {
  //   return cssHover;
  // }
  
  return cssNormal;
}
