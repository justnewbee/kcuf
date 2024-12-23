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
  // mixinInputBorderHover,
  mixinInputBorderFocus,
  mixinInputBorderFocusBrand,
  mixinInputBorderDisabled
} from '@kcuf/fork-console-base-theme';
import {
  InputTextProps
} from '@kcuf-ui/rc-input-text-headless';

const cssNormal = css<InputTextProps>`
  ${mixinInputBg}
  ${props => props.borderless ? null : mixinInputBorder}
`;

// const cssHover = css<InputTextProps>`
//   ${mixinInputBgHover}
//   ${props => (props.borderless ? null : mixinInputBorderHover)}
// `;

const cssFocus = css<InputTextProps>`
  ${mixinInputBgFocus}
  ${props => {
    if (props.borderless) {
      return null;
    }
    
    return props.theme === 'brand' ? mixinInputBorderFocusBrand : mixinInputBorderFocus;
  }}
`;

const cssDisabled = css<InputTextProps>`
  ${mixinInputBgDisabled}
  ${props => props.borderless ? null : mixinInputBorderDisabled}
`;

export default function getStyledBorder(props: InputTextProps): RuleSet<InputTextProps> {
  if (props.disabled) {
    return cssDisabled;
  }
  
  if (props.focused && !props.weakFocusStyle) {
    return cssFocus;
  }
  
  // if (props.hovered) {
  //   return cssHover;
  // }
  
  return cssNormal;
}
